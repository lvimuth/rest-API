const express = require("express");
const app = express();
const port = 5500;
const host = "127.0.0.1";

const books = [
  { title: "Book 1", author: "Author 1", publicationYear: 2000 },
  { title: "Book 2", author: "Author 2", publicationYear: 2005 },
  { title: "Book 3", author: "Author 3", publicationYear: 2010 },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
