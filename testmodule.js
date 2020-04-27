const { setConfig, startFetch } = require('./start');

setConfig({
    flagsBase: 'https://covidstat.info/static/images/flags/',
    redis: {
        host: "localhost",
        password: "",
        port: "6379"
    } })
startFetch();