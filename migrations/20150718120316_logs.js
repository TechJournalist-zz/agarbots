exports.up = function(knex, Promise) {
  return knex.schema.createTable('logs', function (table) {
    table.increments();
    table.integer('play_id');
    table.text('message');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('logs');
};
