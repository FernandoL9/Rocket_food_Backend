exports.up = knex => knex.schema.createTable("order", table => {
  table.increments("id");
  table.text("name");
  table.text("quantily");
  table.text("delivery");
  table.integer("price_total");
  table.integer("pay")
  table.integer("avaliation");
  
  table.integer("category_id").references("id").inTable("category")
  table.timestamp("created_at").default(knex.fn.now());
  table.integer("dishes_id").references("id").inTable("dishes")
  // table.integer("title_dishes").references("title").inTable("dishes")
  // table.text("price_dishes").references("price").inTable("dishes")
})


exports.down = knex => knex.schema.dropTable("order")
