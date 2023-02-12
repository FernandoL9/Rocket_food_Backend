const {Router} = require("express") // import router

const routes = Router() // starting router

const usersRouter = require("./users.routes")

routes.use("/users", usersRouter) // search the router user

module.exports = routes