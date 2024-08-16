const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/db");
const { PORT } = require("./config/server.config");
app.use(cors());
app.use(express.json());

app.get("/api", (__, res) => {
  res.json({ message: "Hello from the API!" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, async () => {
  connectDb();
  console.log(`Server started... ${PORT}`);
});
