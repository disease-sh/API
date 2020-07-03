// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/historical', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/historical instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/historical/:country', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/historical instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/jhucsse', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/jhucsse instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/all', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/all instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/countries', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/countries instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/countries/:query', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/countries instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/states', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/states instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/yesterday', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/countries?yesterday=true instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/yesterday/all', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/all?yesterday=true instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

router.get('/yesterday/:query', async (req, res) => res
	.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."')
	.status(410)
	.send({
		message: 'This endpoint has been deprecated. Use /v3/covid-19/countries?yesterday=true instead.',
		docs: `${req.protocol}://${req.get('host')}/docs`
	}));

module.exports = router;
