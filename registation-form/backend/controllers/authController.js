const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    let {
      fullName,
      email,
      phone,
      rollNo,
      department,
      graduationYear,
      password,
    } = req.body;

    // Normalize inputs
    if (typeof rollNo === "string") {
      rollNo = rollNo.trim();
      if (rollNo === "") rollNo = undefined; // avoid saving empty string which can conflict with unique indexes
    }

    if (graduationYear) {
      const parsed = parseInt(graduationYear, 10);
      if (!isNaN(parsed)) graduationYear = parsed;
      else graduationYear = undefined;
    }

    // check for existing user by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createPayload = {
      fullName,
      email,
      phone,
      department,
      graduationYear,
      password: hashedPassword,
    };

    if (rollNo) createPayload.rollNo = rollNo;

    const user = await User.create(createPayload);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    // Friendly handling for duplicate key errors
    if (error && error.code === 11000) {
      const key = Object.keys(error.keyValue || {})[0];
      return res.status(400).json({
        success: false,
        message: `Duplicate value for field: ${key}`,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};