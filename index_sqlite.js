const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

// Use the books route
const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Book API!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
