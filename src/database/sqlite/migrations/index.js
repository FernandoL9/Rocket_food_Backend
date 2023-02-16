const sqliteConnection = require("../../sqlite") // import the connection database
const createUsers = require("./createUsers") // import of methodo for create User

// function for table create
async function migrationsRun() {
  const schemas = [
    createUsers
  ].join("")

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
}

module.exports = migrationsRun