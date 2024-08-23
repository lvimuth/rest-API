const express = require("express");
const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

const books = [
  { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Book API!");
});

app.get("/books", (req, res) => {
  res.json(books);
});

// New Route: Add a new book
app.post("/books", (req, res) => {
  const maxId = books.reduce((max, book) => (book.id > max ? book.id : max), 0);
  const newBook = {
    id: maxId + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id); // Parse the ID to an integer
  const bookIndex = books.findIndex((b) => b.id === bookId); // Find the index of the book

  if (bookIndex !== -1) {
    // If the book exists
    books.splice(bookIndex, 1); // Remove the book from the array
    res.sendStatus(204); // Respond with 204 No Content
  } else {
    res.status(404).send("Book not found"); // Respond with 404 if not found
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
