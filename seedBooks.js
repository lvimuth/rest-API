// seedBooks.js
const sqlite3 = require("sqlite3").verbose();
const db = require("./db"); // Adjust the path to your db.js file

const books = [
  { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

// Insert books into the database
db.serialize(() => {
  const stmt = db.prepare(
    "INSERT INTO books (id, title, author) VALUES (?, ?, ?)"
  );

  books.forEach((book) => {
    stmt.run(book.id, book.title, book.author);
  });

  stmt.finalize((err) => {
    if (err) {
      console.error("Failed to insert books:", err.message);
    } else {
      console.log("Books inserted successfully.");
    }
    db.close();
  });
});
