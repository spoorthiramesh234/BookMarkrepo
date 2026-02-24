const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const filePath = "./data/bookmarks.json";

// Helper to read file
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper to write file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// CREATE
router.post("/", (req, res) => {
  const bookmarks = readData();
  const newBookmark = {
    id: uuidv4(),
    title: req.body.title,
    url: req.body.url
  };
  bookmarks.push(newBookmark);
  writeData(bookmarks);
  res.status(201).json(newBookmark);
});

// READ
router.get("/", (req, res) => {
  const bookmarks = readData();
  res.json(bookmarks);
});

// UPDATE
router.put("/:id", (req, res) => {
  const bookmarks = readData();
  const index = bookmarks.findIndex(b => b.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  bookmarks[index] = { ...bookmarks[index], ...req.body };
  writeData(bookmarks);
  res.json(bookmarks[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  let bookmarks = readData();
  bookmarks = bookmarks.filter(b => b.id !== req.params.id);
  writeData(bookmarks);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;