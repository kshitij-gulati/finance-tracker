const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // 1. Check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // 2. Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // 3. Generate JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };