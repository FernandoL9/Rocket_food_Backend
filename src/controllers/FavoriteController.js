const knex = require("../database/knex")

class favoriteController {
  async create(request, response) {
    const {dishes_id} = request.body
    const {user_id} = request.params

    await knex("favorite").insert({
      dishes_id,
      user_id
    })

  return response.json()
  }

  async show(request, response) {
    const {user_id} = request.params

    const favoriteDishes = await knex("favorite")
    .select([
      // "favorite.id",
      "dishes.title",
      "dishes.price",
      "category.title as Category",
    ])
    .where("favorite.user_id", user_id)
    .innerJoin("dishes", "dishes.id", "favorite.dishes_id")
    .innerJoin("category", "category.id", "dishes.category_id")

    return response.json(favoriteDishes)
  }

}

module.exports = favoriteController