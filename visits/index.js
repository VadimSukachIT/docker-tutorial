import express from 'express';
import redis from 'redis';

const app = express();
const redisClient = redis.createClient({
  host: 'redis-server'
});
redisClient.set('visits', 0);

app.get('/', (req, res) => {
  redisClient.get('visits', (err, visits) => {
    redisClient.set('visits', parseInt(visits) + 1);
    res.send(200, `Visits + ${visits}`)
  })
})

app.listen(8080, () => {
  console.log('App listening on port 8080');
})