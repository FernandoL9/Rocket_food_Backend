const {Router} = require("express") // import router

const dishRouter = Router() // starting router

const DishController = require("../controllers/DishController")

const dishController = new DishController()

//upload dados
dishRouter.post("/:user_id", dishController.create)
dishRouter.get("/:id", dishController.show)

module.exports = dishRouter