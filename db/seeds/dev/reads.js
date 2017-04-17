exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE reads RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thetwo-way/2017/04/17/524339260/arkansas-pushes-to-carry-out-executions-fighting-court-rulings-and-the-clock", 5, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/2017/04/17/522726303/act-up-at-30-reinvigorated-for-trump-fight", 4, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thetwo-way/2017/04/17/524316419/pence-tells-north-korea-the-era-of-strategic-patience-is-over", 5, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thetwo-way/2017/04/17/524352916/mexico-catches-one-of-several-fugitive-former-governors-after-a-half-year-hunt", 6, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thetwo-way/2017/04/17/524309137/erdogan-says-monitors-questioning-turkey-s-vote-should-know-their-place", 5, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thetwo-way/2017/04/17/524359998/2-first-time-boston-marathoners-emerge-victorious", 12, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/parallels/2017/04/17/521400443/amid-aid-uncertainty-u-s-counter-terrorism-cooperation-continues-in-africa", 1, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/ed/2017/04/17/524234563/schools-will-soon-have-to-put-in-writing-if-they-lunch-shame", 9, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thesalt/2017/04/17/523609388/peep-show-watch-us-calculate-the-speed-of-light-with-stale-easter-treats", 3, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/2017/04/17/523634144/tax-filings-seen-dipping-amid-trump-crackdown-on-illegal-immigration", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/thetwo-way/2017/04/16/524260257/cleveland-police-search-for-suspected-shooter-accused-of-live-streaming-homicide", 13, new Date]
      ),
      knex.raw(
        'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
        ["http://www.npr.org/sections/parallels/2017/04/17/521400443/amid-aid-uncertainty-u-s-counter-terrorism-cooperation-continues-in-africa", 8, new Date]
      ),
    ]);
  });
};
