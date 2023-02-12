const {Router} = require("express") // import router

const usersRouter = Router() // starting router

const UsersController = require("../controllers/UsersController")

const usersController = new UsersController()

//upload dados
usersRouter.post("/", usersController.create)

module.exports = usersRouter