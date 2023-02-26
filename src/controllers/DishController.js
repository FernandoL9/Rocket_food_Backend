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
      category_id: category}  
    )

    const ingredientInsert = ingredients.map(ingredient =>{
      return {
        dishes_id,
        name: ingredient
      }
    })

    await knex("ingredient").insert(ingredientInsert)
    
    return response.json()
  }

  async show(request, response) {
    const {id} = request.params

    const dish = await knex("dishes").where({id}).first()
    const {category_id} = dish

    const category = await knex("category").where({id: category_id})
    const ingredient = await knex("ingredient").where({dishes_id: id}).orderBy("name")

    console.log(dish)
    console.log(ingredient)

    return response.json({
      ...dish,
      category,
      ingredient
    })
  }
}

module.exports = DishController