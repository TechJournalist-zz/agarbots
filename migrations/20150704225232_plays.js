exports.up = function(knex, Promise) {
  return knex.schema.createTable('plays', function (table) {
    table.increments();
    table.text('code');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('plays');
};
