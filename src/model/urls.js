const { mongoose } = require('../core/db');

const schema = new mongoose.Schema({
    originalUrl: String,
    generatedUrl: String
}); 

module.exports = mongoose.model('urls', schema);