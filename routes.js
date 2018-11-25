const express = require('express');
const router = express.Router();

const createProfile = require('./src/createProfile');
const getProfile = require('./src/getProfile');
const getServers = require('./src/getServers');
// const reportBug = require('./src/reportBug');

router.post('/v1/profile', createProfile);
router.get('/v1/profile/:id', getProfile);
router.get('/v1/server/us', getServers.getUsServers);
router.get('/v1/server/eu', getServers.getEuServers);
// router.post('/v1/report-bug', reportBug);

module.exports = router;