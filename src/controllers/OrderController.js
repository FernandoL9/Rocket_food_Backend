const knex = require("../database/knex")

class OrderController {
  async create(request, response) {
    const {name, quantily, delivery, price_total, pay, user_id, category} = request.body
    const {dish_id} = request.params

    console.log( name)

    const order = await knex("order").insert({
        name,
        quantily,
        delivery,
        price_total,
        dishes_id: dish_id,
        pay,
        user_id,
        category_id: category
      })
    response.json(order)
  }
  async show(request, response) {
    const {user_id} = request.query

    const orderRequest = await knex("order").where({user_id})

    response.json(orderRequest)
  }
}

module.exports = OrderController

