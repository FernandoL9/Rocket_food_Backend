require("express-async-errors")

const migrationsrun = require("./database/sqlite/migrations")

const express = require("express"); // import express

const app = express(); // starting express

const AppError = require("./ultis/AppError")

app.use(express.json()); // use json in message 

const routes = require("./routes");

const PORT = 3333; // port

app.use(routes);

migrationsrun()

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return response.statusCode(500).json({
    status: "error",
    message: "internal server error"
  })
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`)); // testing of service server