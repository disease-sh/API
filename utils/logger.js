const httpErrorLogger = (err, message = 'Not message loaded') => console.log({
    message,
    errno: err.errno,
    url: err.config.url
});

module.exports = {
    httpErrorLogger
}