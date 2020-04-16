// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/historical', async (req, res) => res.send({ message: 'Deprecated, use /v2/historical' }));

router.get('/historical/:country', async (req, res) => res.send({ message: 'Deprecated, use /v2/historical' }));

router.get('/jhucsse', async (req, res) => res.send({ message: 'Deprecated, use /v2/jhucsse' }));

router.get('/all', async (req, res) => res.send({ message: 'Deprecated, use /v2/all' }));

router.get('/countries', async (req, res) => res.send({ message: 'Deprecated, use /v2/countries' }));

router.get('/countries/:query', async (req, res) => res.send({ message: 'Deprecated, use /v2/countries' }));

router.get('/states', async (req, res) => res.send({ message: 'Deprecated, use /v2/states' }));

router.get('/yesterday', async (req, res) => res.send({ message: 'Deprecated, use /v2/countries?yesterday=true' }));

router.get('/yesterday/all', async (req, res) => res.send({ message: 'Deprecated, use /v2/all?yesterday=true' }));

router.get('/yesterday/:query', async (req, res) => res.send({ message: 'Deprecated, use /v2/countries?yesterday=true' }));

module.exports = router;
