exports.up = knex => knex.schema.createTable("category", table => {
  table.increments("id");
  table.text("title");


  table.integer("dishes_id").references("id").inTable("dishes")
})

exports.down = function(knex) {
  
};
