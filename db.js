const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

// Create a table for books if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL
    )
  `);
});

module.exports = db;
