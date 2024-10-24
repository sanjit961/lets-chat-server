const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(req, res) {
  try {
    const token = req.cookies.token || req.body.token || "";

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    // Get user from token
    const user = await getUserDetailsFromToken(token);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const { name, profile_pic } = req.body;

    // Update user and return updated document
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { name, profile_pic },
      { new: true, select: "-password" } // `new: true` returns the updated document
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "User update failed",
        success: false,
      });
    }

    return res.json({
      message: "User Updated",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
    });
  }
}

module.exports = updateUserDetails;
