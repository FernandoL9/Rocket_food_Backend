const {Router} = require("express") // import router

const favoriteRouter = Router() // starting router

const FavoriteController = require("../controllers/FavoriteController")

const favoriteController = new FavoriteController()

//upload dados
favoriteRouter.post("/:user_id", favoriteController.create)
favoriteRouter.get("/:user_id", favoriteController.show)

module.exports = favoriteRouter