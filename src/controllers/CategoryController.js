const knex = require("../database/knex")

class CategoryController {
  async create(request, response) {
    const {title} = request.body
    const {user_id} = request.params

    console.log(user_id)

    await knex("category").insert({
      title,
      user_id
    })
    return response.json()
  }

  async show(request, response) {
    const {user_id} = request.params

    const category = await knex("category").where({user_id})

    return response.json(category)
  }
}

module.exports = CategoryController