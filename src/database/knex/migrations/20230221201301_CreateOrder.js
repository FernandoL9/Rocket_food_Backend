
exports.up = knex => knex.schema.createTable("favorite", table => {
  table.increments("id");
  
  table.integer("dishes_id").references("id").inTable("dishes")
  table.integer("user_id").references("id").inTable("users")
})
  

exports.down = knex => knex.schema.dropTable("favorite")
