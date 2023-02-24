const knex = require("../database/knex")

class DishController {
  async create(request, response) {
    const {title, price, description, category, ingredients} = request.body
    const {user_id} = request.params

    const dishes_id = await knex("dishes").insert({
      title,
      price,
      description,
      user_id,
      category_id: category
    })

    // const category_id = await knex("category").insert({
    //   title: category
    // }) 

    const ingredientInsert = ingredients.map( ingredient => {
      return {
        dishes_id,
        name: ingredient
      }
    })
    await knex("ingredient").insert(ingredientInsert)

    return response.json()
  }
}

module.exports = DishController