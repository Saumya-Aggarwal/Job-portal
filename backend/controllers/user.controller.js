import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const  register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    res.status(201).json({
      success: true,
      message: "signed up successfully",
      user,
    });
  } catch (error) {
    // Handle duplicate email error (MongoDB error code 11000)
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        message: "Signup failed. Email already exists.",
        success: false,
      });
    }

    // Handle other errors (e.g., database validation errors)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Signup failed. Invalid data provided.",
        error: error.message,
      });
    }
    // Handle general server errors
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not sign up.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist. Please signUp ",
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password. ",
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "User is registered as" + user.role,
      });
    }
    const token = jwt.sign({ UserId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Successfully logged-In",
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not sign up.",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { fullName, email, password, phoneNumber, profile } = req.body;

    if (profile && typeof profile.skills === "string") {
      profile.skills = profile.skills.split(",").map((skill) => skill.trim());
    }
    const updateData = { fullName, email, password, phoneNumber, profile };
    // Find user by ID and update with new data
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found " });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
