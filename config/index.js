const keys = require('./config.keys.json');
let config;
try {
    config = require('./config.json');
} catch (err) {
    config = require('./config.example.json');
}

console.log(process.env['covid_api_mode']);

module.exports = {
    config,
    keys
}
