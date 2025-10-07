const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/v1/user/signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully.",
      user_id: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/v1/user/login
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Username and password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid Username and password",
      });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
