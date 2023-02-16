const sqlite3 = require("sqlite3") // import sqlite3 driver 
const sqlite = require("sqlite") // import 
const path = require("path")

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })
  return database;
}

module.exports = sqliteConnection