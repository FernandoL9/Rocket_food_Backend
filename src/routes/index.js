const {Router} = require("express") // import router

const routes = Router() // starting router

const usersRouter = require("./users.routes")
const dishRouter = require("./dish.routes")
const categoryRouter = require("./category.routes")

routes.use("/users", usersRouter) // search the router user
routes.use("/dish", dishRouter) // search the router user
routes.use("/category", categoryRouter) // search the router user

module.exports = routes