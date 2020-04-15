/* eslint-disable no-console */
/* eslint-disable no-shadow */

const msg = (func, message) => func(`[${new Date().toISOString()}]: ${message}`);

const err = (message = 'Unknown Error', err) => console.error({
	message: `[${new Date().toISOString()}]: ${message}`,
	error: err.message,
	stack: err.stack
});

const info = (message) => msg(console.info, message);

const warn = (message) => msg(console.warn, message);

module.exports = {
	err,
	info,
	warn
};
