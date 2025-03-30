import Staff from "../models/staffModel.js";
import bcrypt from "bcrypt";
import { createToken } from "./userController.js";
// Add new staff
export const addStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res
      .status(201)
      .json({ message: "Staff added successfully", staff: newStaff });
  } catch (error) {
    res.status(500).json({ message: "Error adding staff", error });
  }
};

// Get all staff members
export const listStaff = async (req, res) => {
  try {
    const staffList = await Staff.find({ role: "manager" });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving staff", error });
  }
};

// Update staff details
export const updateStaff = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;
    const updatedStaff = await Staff.findOneAndUpdate({ email }, updateData, {
      new: true,
    });

    if (!updatedStaff)
      return res.status(404).json({ message: "Staff not found" });

    res
      .status(200)
      .json({ message: "Staff updated successfully", staff: updatedStaff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating staff", error });
  }
};

// Delete staff
export const removeStaff = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(req.body);
    // Validate userId exists
    if (!email) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const deletedStaff = await Staff.findByIdAndDelete(staff._id);
    return res.status(200).json({ message: "Staff removed successfully" });
  } catch (error) {
    console.error("Error in removeStaff:", error);
    return res
      .status(500)
      .json({ message: "Error deleting staff", error: error.message });
  }
};

// Login staff
export const loginStaff = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const user = await Staff.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = user.password === password;

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
