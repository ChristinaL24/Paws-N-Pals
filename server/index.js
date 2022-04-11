require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: '', secret: '' });

client.animal.search({
  type: 'Dog',
  limit: 1,
  location: '92683',
  distance: 10
})
  .then(function (response) {
    // eslint-disable-next-line no-console
    console.log(response.data.animals); // Do something with `response.data.animals`
  })
  .catch(err => {
    console.error(err);
  });

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
