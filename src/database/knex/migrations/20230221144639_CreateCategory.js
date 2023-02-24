exports.up = knex => knex.schema.createTable("category", table => {
  table.increments("id");
  table.text("title");
  
  table.integer("user_id").references("id").inTable("users")
})


exports.down = knex => knex.schema.dropTable("category")
