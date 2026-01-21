const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/blogs", blogRoutes);

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blog.html"));
});

mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
