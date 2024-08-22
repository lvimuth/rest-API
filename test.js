const express = require("express");
const app = express();
const port = 5500;
const host = "127.0.0.1";
const path = require("path");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

const books = [
  { title: "Book 1", author: "Author 1", publicationYear: 2000 },
  { title: "Book 2", author: "Author 2", publicationYear: 2005 },
  { title: "Book 3", author: "Author 3", publicationYear: 2010 },
];

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"));
});

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST to add a new book
app.post("/books/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publicationYear: parseInt(req.body.publicationYear),
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Start the server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
