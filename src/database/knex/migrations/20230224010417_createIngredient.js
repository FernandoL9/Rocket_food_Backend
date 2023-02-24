exports.up = knex => knex.schema.createTable("ingredient", table => {
  table.increments("id");
  table.text("name");

  table.integer("dishes_id").references("id").inTable("dishes").onDelete("CASCADE")
})


exports.down = function(knex) {
  
};
