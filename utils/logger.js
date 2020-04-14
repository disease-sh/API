/* eslint-disable no-console */
module.exports = {
	err: (message = 'Unknown Error', err) => console.error({
		message: `[${new Date().toISOString()}]: ${message}`,
		error: err.message,
		stack: err.stack
	}),
	info: (message) => console.info(`[${new Date().toISOString()}]: ${message}`),
	warn: (message) => console.warn(`[${new Date().toISOString()}]: ${message}`)
};
