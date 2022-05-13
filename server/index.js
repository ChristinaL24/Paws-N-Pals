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
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

// handles sign ups
app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2.hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "joinedAt")
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

// handles sign ins
app.post('/api/auth/log-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login credentials');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
      where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login credentials');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login credentials');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ token, user: payload });
        });
    })
    .catch(error => next(error));
});

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

// everything after this middleware requires a token
app.use(authorizationMiddleware);

// saves matches into db
app.post('/api/favorites', (req, res, next) => {
  const { userId } = req.user;
  const { petId, details } = req.body;
  if (!petId || !details) {
    throw new ClientError(400, 'sorry! this pet is no longer available or cannot be found');
  }
  const sql = `
    insert into "favorites" ("userId", "petId", "details")
      values ($1, $2, $3)
      returning *
  `;
  const params = [userId, petId, details];
  db.query(sql, params)
    .then(result => {
      const [animal] = result.rows;
      res.status(201).json(animal);
    })
    .catch(error => next(error));
});

// retrieves saved matches in db
app.get('/api/saved', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid user credentials');
  }
  const sql = `
    select *
      from "favorites"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

// gets pet details
app.get('/api/details/:petId', (req, res, next) => {
  const { userId } = req.user;
  const petId = Number(req.params.petId);
  if (!userId) {
    throw new ClientError(401, 'invalid user credentials');
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

app.delete('/api/details/:petId', (req, res, next) => {
  const { userId } = req.user;
  const petId = Number(req.params.petId);
  if (!userId) {
    throw new ClientError(401, 'invalid user credentials');
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
