const {Router} = require("express") // import router

const routes = Router() // starting router

const usersRouter = require("./users.routes")
const dishRouter = require("./dish.routes")
const categoryRouter = require("./category.routes")
const orderRouter = require("./order.routes")
const favoriteRouter = require("./favorite.routes")

routes.use("/dish", dishRouter) // search the router dishes
routes.use("/order", orderRouter) // search the router request
routes.use("/users", usersRouter) // search the router user
routes.use("/favorite", favoriteRouter) // search the router favorite
routes.use("/category", categoryRouter) // search the router user

module.exports = routes