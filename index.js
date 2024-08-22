const express = require("express");
const app = express();
const port = 4000;

// Sample data: a list of books
const books = [
  { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Book API!");
});

// New Route: Get the list of all books
app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
