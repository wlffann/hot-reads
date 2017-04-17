const express = require('express')
const app = express()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var pug = require('pug');

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5000)
app.locals.title = 'Hot Reads'

app.get('/', (request, response) => {
	database.select().table('reads').orderBy('count', 'desc').limit(10)
  .then((reads) => response.render('index', {title: 'Hot Reads!', top_reads: reads}))
})

app.post('/', (request, response) => {
  let link_url = request.body.link.url
  database.select().from('reads').where('url', link_url).limit(1)
  .then((link) => {
    if (link.length == 0) {
      database('reads').insert({url: link_url, count: 1, created_at: new Date})
      .then(response.status(201).send('Read recieved!'))
    } else {
      database('reads').where('url', link_url).update({count: link[0].count++})
      .then(response.status(202).send('Read recieved!'))
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
