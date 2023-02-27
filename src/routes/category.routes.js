const {Router} = require("express") // import router

const categoryRouter = Router() // starting router

const CategoryController = require("../database/knex/migrations/CategoryController")

const categoryController = new CategoryController()

//upload dados
categoryRouter.post("/:user_id", categoryController.create)

module.exports = categoryRouter