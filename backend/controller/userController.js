const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    let user = await User.findById(id);
    if (!user) return res.status(404).send("User not found.");

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send("User not found.");

    await user.remove();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.saveUser = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    await User.save({ username, email, role });
    res.json({ message: "User added" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
