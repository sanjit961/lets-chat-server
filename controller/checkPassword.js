const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;

    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    // Verify the password
    const verifiedPassword = await bcryptjs.compare(password, user.password);
    if (!verifiedPassword) {
      return res.status(400).json({
        message: "Invalid password",
        error: true,
      });
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    // Set the token as a cookie
    res.cookie("token", token, cookieOptions);

    // Return success response
    return res.status(200).json({
      message: "Login success",
      token: token,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
    });
  }
}

module.exports = checkPassword;
