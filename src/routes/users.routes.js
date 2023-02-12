const { Router } = require("express");

const usersRouter = Router();

// function to upload dados
usersRouter.post("/", (request, response) => {
	const {name, email, password} = request.body;

	response.json({name, email, password});
});

module.exports = usersRouter;