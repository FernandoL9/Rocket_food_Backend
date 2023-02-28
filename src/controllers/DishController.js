const knex = require("../database/knex")

class DishController {
  // create method register in table dishes and ingredient
  async create(request, response) {
    const {title, price, description, category, ingredients} = request.body
    const {user_id} = request.params

    // register in table dishes
    const dish_id = await knex("dishes").insert({
      title,
      price,
      description,
      user_id,
      category_id: category
    })

    // search ingredient by method map
    const ingredientInsert = ingredients.map( ingredient => {
      return {
        dishes_id : dish_id,
        name: ingredient
      }
    }) 

    //register in table in ingredient
    await knex("ingredient").insert(ingredientInsert)

    // stts the return
    return response.json()
  }

  async show(request, response) {
    const {id} = request.params

    //search in table dishes o id
    const dish = await knex("dishes").where({id}).first()
    const {category_id} = dish
    
    //search the catory
    const category = await knex("category").where({id: category_id})
  
    //search the catory
    const ingredient = await knex("ingredient").where({dishes_id: id}).orderBy("name")

    //result the search
    return response.json({
      dish,
      category,
      ingredient
    })
  }

  async delete(request, response) {
    const {id} = request.params

    console.log(id)

   const del =  await knex("dishes").where({id}).delete()

   console.log(del)
    response.json()
  }

  async index(request, response) {
    const {user_id} = request.query

    const alldishes =  await knex("dishes")

    console.log(alldishes)

   return response.json({
      ...alldishes
    })
  }

}
module.exports = DishController