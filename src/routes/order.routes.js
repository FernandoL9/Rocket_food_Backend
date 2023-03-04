const {Router} = require("express") // import router

const orderRouter = Router() // starting router

const OrderController = require("../controllers/OrderController")

const oderController = new OrderController()

//upload dados
orderRouter.post("/:dish_id", oderController.create)
//get dados
orderRouter.get("/", oderController.show)

module.exports = orderRouter