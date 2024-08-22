const express = require("express");
const app = express();
const port = 3000;

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
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
