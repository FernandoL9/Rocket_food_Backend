const knex = require("../database/knex")

class favoriteController {
  async create(request, response) {
    const {dishes_id} = request.body
    const {user_id} = request.params

    await knex("favorite").insert({
      dishes_id,
      user_id
    })

    response.json()
  }

}

module.exports = favoriteController