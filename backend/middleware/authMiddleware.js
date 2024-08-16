const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied.");
  }
  next();
};

module.exports = { auth, adminAuth };
