const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists.");

    user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
