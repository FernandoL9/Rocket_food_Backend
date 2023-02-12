const {Router} = require("express") // import router

const usersRouter = Router() // starting router

//
usersRouter.post("/", (request, response) => {
	const {name, email, password} = request.body

	response.json({name, email, password})
})

module.exports = usersRouter