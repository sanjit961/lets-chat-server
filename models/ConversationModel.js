const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    msgByUserId: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "User",
    },
    isDelivered: {
      type: Boolean,
      default: false, // Initially false, updated when delivered
    },
    seen: {
      type: Boolean,
      default: false, // Can be used for any other tracking logic (like typing indicators, etc.)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "User",
    },
    reciever: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "User",
    },
    messages: [{ type: mongoose.Schema.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", messageSchema);
const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = {
  MessageModel,
  ConversationModel,
};
