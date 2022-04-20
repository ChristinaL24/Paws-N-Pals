require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');
const app = express();
const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET });
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/pets/:location/:type', (req, res, next) => {
  const { location } = req.params;
  const { type } = req.params;
  if (!location || !type) {
    throw new ClientError(400, 'Invalid location or type selection');
  }
  client.animal.search({
    limit: 1,
    distance: 20,
    sort: 'random',
    location: location,
    type: type
  })
    .then(response => {
      const animal = response.data.animals[0];
      res.status(200).json(animal);
    })
    .catch(error => console.error(error));
});

// handles getting all the saved matches
app.get('/api/matches', (req, res, next) => {
  const sql = `
    select "petId",
           "userId",
           "details"
      from "favorites"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// post request that handles saving pets into favorites table
app.post('/api/favorites', (req, res, next) => {

  const petId = req.body.petId;
  const userId = 1;
  const details = req.body.details;

  const sql = `
    insert into "favorites" ("petId", "userId", "details")
      values ($1, $2, $3)
      returning *
  `;

  const params = [petId, userId, details];
  return db.query(sql, params)
    .then(result => {
      const [animal] = result.rows;
      res.status(201).json(animal);
    })
    .catch(error => next(error));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
