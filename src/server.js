const express = require("express"); // import express

const app = express(); // starting express

app.use(express.json()); // use json in message 

const routes = require("./routes")

const PORT = 3333; // port

app.use(routes);


app.listen(PORT, console.log(`Server is running on port ${PORT}`)); // testing of service server