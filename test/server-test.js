const assert = require('chai').assert;
const app = require('../server');
const request = require('request');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const makeRead = () => {
  return database.raw(
    'INSERT INTO reads (url, count, created_at) VALUES (?, ?, ?)',
    ["http://www.turing.io", 3, new Date]
  )
}

const emptyReadsTable = () => {
  return database.raw('TRUNCATE reads RESTART IDENTITY')
}

describe('Server', () => {
  
  before(done => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
    
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    });
  });
  
  beforeEach((done) => {
    makeRead()
    .then(() => done());
  })
 
  after(() => {
    this.server.close();
  });
  
  afterEach((done) => {
    emptyReadsTable()
    .then(() => done())
  })

  it('should exist', () => {
    assert(app);
  });
  
  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    })

    it('should return title', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error) }
        assert.include(response.body, 'Hot Reads', 'body contains title');
        done();
      });
    })
    
    it('should return top links', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error) }
        assert.include(response.body, 'http://www.turing.io', 'body contains top link');
        done();
      });
    })
  });

  describe('POST /', () => {
    it('should return a 201', (done) => {
      this.request.post({url: '/', form: {"link": {"url": "https://agile-ocean-54614.herokuapp.com/"}}}, (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 201);
        done();
      });
    })

    it('should create a read for the url if not saved', (done) => {
      this.request.post({url: '/', form: {"link": {"url": "https://agile-ocean-54614.herokuapp.com/"}}}, (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 201);
        done();
      })
    })

    it('should update a read for a link that has already been saved', (done) => {
      this.request.post({url: '/', form: {"link": {"url": "http://www.turing.io"}}}, (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 202);
        done();
      })
    })
  })
});
