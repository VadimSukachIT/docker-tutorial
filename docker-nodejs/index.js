import express from 'express';

const app = express();

app.get('/', () => {
  console.log('Server get');
})

app.listen(8080, () => {
  console.log('App listening on port 8080');
})