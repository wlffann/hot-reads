exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE reads(
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT,
    count INTEGER,
    created_at DATE
  )`;
  return knex.raw(createQuery);  
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE reads`;
  return knex.raw(dropQuery); 
};
