const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        message: "Title and body are required"
      });
    }

    const blog = await Blog.create({ title, body, author });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID", error });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        message: "Title and body are required"
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID", error });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID", error });
  }
});

module.exports = router;
