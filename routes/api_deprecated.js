// eslint-disable-next-line new-cap
const router = require('express').Router();

router.use((req, res, next) => {
  res.status(410);
  res.header('Warning', '299 - "This endpoint is deprecated. Check out the docs for details."');
  next();
});

router.get('/historical', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/historical`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/historical/:country', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/historical`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/jhucsse', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/jhucsse`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/all', async (req, res) => res.status(410).send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/all`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/countries', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/countries`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/countries/:query', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/countries`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/states', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/states`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/yesterday', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/countries?yesterday=true`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/yesterday/all', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/all?yesterday=true`, docs: `${req.protocol}://${req.get('host')}/docs` }));

router.get('/yesterday/:query', async (req, res) => res.send({ message: 'This endpoint has been deprecated.', newLocation: `${req.protocol}://${req.get('host')}/v2/countries?yesterday=true`, docs: `${req.protocol}://${req.get('host')}/docs` }));

module.exports = router;
