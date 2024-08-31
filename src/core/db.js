const { mongoose } = require('mongoose');
const redis = require('redis');

const { URI } = process.env;
const { REDIS_URI }  = process.env;

mongoose.connect(URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));


const client = redis.createClient({
    url: REDIS_URI
});

client.connect()
    .then(() => {
        console.log('Redis connected successfully');
    })
    .catch(err => {
        console.error('Redis connection error:', err);
    });

module.exports = {client, mongoose};