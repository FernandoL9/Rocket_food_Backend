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

  // usar para pesquisar por tags / title 
  async index(request, response) {
    const {title, ingredient, user_id} = request.query

    let dish;

    if(ingredient){
      const filterIngredient = ingredient.split(',')
      .map(tag => tag.trim())
      
      dish = await knex("ingredient")
      .select([
        "dishes.id",
        "dishes.title",
        "dishes.price",
        "dishes.description",
        "category.title as Category",
        "ingredient.name as Ingredient",
      ])
      .whereIn("name", filterIngredient)
      .innerJoin("dishes", "dishes.id", "ingredient.dishes_id")
      .innerJoin("category", "category.id", "dishes.category_id")
      .groupBy("dishes.id")
      .orderBy("dishes.title")

    }else{

      dish =  await knex("dishes")
      .where({user_id})
      .whereLike("title",`%${title}%`)
      .orderBy("title")

    }

    const IngredientWithDish = await knex("ingredient")
    const dishWithIngredient =  dish.map(dishes => {
      const dishesIngredient = IngredientWithDish.filter(tag => tag.dishes_id === dishes.id);

      return {
        ...dishes,
        ingredients : dishesIngredient
      }
    })

   return response.json(dishWithIngredient)
  }

}
module.exports = DishController