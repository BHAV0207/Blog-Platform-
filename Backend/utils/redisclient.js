const Redis = require('ioredis');
const redisUrl = process.env.REDIS_URL || 'redis://default:<password>@<hostname>:<port>'

const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('Connected to Redis');
})

redis.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
} )

module.exports = redis;
