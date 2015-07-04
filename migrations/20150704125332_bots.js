
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bots', function (table) {
    table.increments();
    table.text('code');
    table.timestamps();
    // TODO(ibash) wantto have a parent bot id?
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bots');
};
