const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all books
router.get("/", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a single book by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });
});

// Add a new book
router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }
  const sql = "INSERT INTO books (title, author) VALUES (?, ?)";
  const params = [title, author];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Update a book by ID
router.put("/:id", (req, res) => {
  const { title, author } = req.body;
  const id = req.params.id;
  const sql = "UPDATE books SET title = ?, author = ? WHERE id = ?";
  const params = [title, author, id];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ updatedID: id });
  });
});

// Delete a book by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM books WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.sendStatus(204);
  });
});

module.exports = router;
