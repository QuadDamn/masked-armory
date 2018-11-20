const express = require('express');
const router = express.Router();

const createArmory = require('./src/createArmory');
const getArmory = require('./src/getArmory');
const getServers = require('./src/getServers');
// const reportBug = require('./src/reportBug');

router.post('/v1/armory', createArmory);
router.get('/v1/armory/:id', getArmory);
router.get('/v1/server/us', getServers.getUsServers);
router.get('/v1/server/eu', getServers.getEuServers);
// router.post('/v1/report-bug', reportBug);

module.exports = router;