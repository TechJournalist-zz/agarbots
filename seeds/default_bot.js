exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('bots').del(),

    // Inserts seed entries
    knex('bots').insert({id: 1, code: 'function step(state, controller) {\n}'})
  );
};
