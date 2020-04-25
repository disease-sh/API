const { setConfig, startFetch } = require('./start');

setConfig({
    redis: {
        host: "localhost",
        password: "",
        port: "6379"
    } })
startFetch();