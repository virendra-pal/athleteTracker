const router = require('express').Router();
const { protect } = require('../middleware/auth');
const analytics = require('../controllers/analyticsController');

router.get('/athlete/:athleteId/kpis', protect, analytics.athleteKPIs);
router.get('/athlete/:athleteId/trend', protect, analytics.athleteTrend);

module.exports = router;