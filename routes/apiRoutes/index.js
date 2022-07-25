const express = require('express');
const router = express.Router();

module.exports = router;

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));
router.use(require('./votesRoutes'));


