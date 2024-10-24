const { ConversationModel } = require("../models/ConversationModel");

const getConversation = async (currentUserId) => {
  if (!currentUserId) return [];

  try {
    const currentUserConversation = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { reciever: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("reciever");

    const conversation = currentUserConversation.map((conv) => {
      const countUnSeenMsg = conv.messages.reduce((prev, curr) => {
        return curr?.msgByUserId?.toString() !== currentUserId && !curr?.seen
          ? prev + 1
          : prev;
      }, 0);

      return {
        _id: conv?._id,
        sender: conv?.sender,
        reciever: conv?.reciever,
        unSeenMsg:  countUnSeenMsg,
        lastMsg: conv?.messages[conv?.messages?.length - 1],
      };
    });
    return conversation;
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
  }
};

module.exports = { getConversation };
