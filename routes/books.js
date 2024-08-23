const express = require("express");
const router = express.Router();

const books = [
  { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

// Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// Get a single book by ID
router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Add a new book
router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    !author ||
    typeof author !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Title and author must be non-empty strings" });
  }

  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID
router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Delete a book by ID
router.delete("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.sendStatus(204); // No Content
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

module.exports = router;
