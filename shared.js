var axios = require("axios");

var countriesPayload = async () => {
    return await axios.get('https://www.worldometers.info/coronavirus/')
};

module.exports = {
    countriesPayload
};