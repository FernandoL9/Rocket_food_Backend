exports.up = knex => knex.schema.createTable("order", table => {
  table.increments("id");
  table.text("name");
  table.text("quantily");
  table.text("delivery");
  table.integer("price_total");
  table.integer("pay")
  table.integer("avaliation")
  
  table.integer("user_id").references("id").inTable("users")
  table.integer("category_id").references("id").inTable("category")
  table.integer("dishes_id").references("id").inTable("dishes")
  table.timestamp("created_at").default(knex.fn.now());
})


exports.down = knex => knex.schema.dropTable("order")
