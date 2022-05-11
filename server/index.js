require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');
const app = express();
const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET });
const argon2 = require('argon2');
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/matches/:location/:type', (req, res, next) => {
  const { location } = req.params;
  const { type } = req.params;
  if (!location || !type) {
    throw new ClientError(400, 'Invalid location or type selection');
  }
  client.animal.search({
    limit: 1,
    distance: 35,
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

app.get('/api/saved', (req, res, next) => {
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

app.get('/api/details/:petId', (req, res, next) => {
  const petId = Number(req.params.petId);
  if (!petId) {
    throw new ClientError(400, 'petId must be a positive integer');
  }
  const sql = `
    select "petId",
           "details"
      from "favorites"
      where "petId" = $1
  `;
  const params = [petId];
  db.query(sql, params)
    .then(result => {
      const selectedPal = result.rows[0];
      if (!selectedPal) {
        throw new ClientError(404, `Cannot find pal with petId ${petId}`);
      }
      res.json(selectedPal);
    })
    .catch(err => next(err));
});

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

// handles sign ups
app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2.hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "password", "joinedAt")
          values ($1, $2, now())
          returning "userId", "username", "joinedAt"
      `;
      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const [user] = result.rows;
          res.status(201).json(user);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

app.delete('/api/details/:petId', (req, res, next) => {
  const petId = Number(req.params.petId);
  if (!petId) {
    throw new ClientError(400, 'petId must be a positive integer');
  }
  const sql = `
  delete from "favorites"
      where "petId" = $1
      returning *
  `;
  const params = [petId];
  db.query(sql, params)
    .then(result => {
      const [deletedPal] = result.rows;
      if (!deletedPal) {
        throw new ClientError(404, `Cannot find pal with the petId ${petId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
