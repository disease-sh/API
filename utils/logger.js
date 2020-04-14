module.exports = {
	httpErrorLogger: (err, message = 'Message could not be loaded') => console.error({
		message,
		errno: err.errno,
	})
};
