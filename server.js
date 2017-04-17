const express = require('express')
const app = express()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var pug = require('pug');

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5000)
app.locals.title = 'Hot Reads'

app.get('/', (request, response) => {
	let reads = database.select().table('reads').orderBy('count', 'desc').limit(10)
  .then((reads) => response.render('index', {title: 'Hot Reads!', top_reads: reads}))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
