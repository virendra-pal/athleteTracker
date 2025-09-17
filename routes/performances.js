const router = require('express').Router();
const { protect } = require('../middleware/auth');
const pc = require('../controllers/performanceController');

router.post('/', protect, pc.addPerformance);
router.get('/athlete/:athleteId', protect, pc.getPerformancesByAthlete);
router.get('/match/:matchId', protect, pc.getPerformancesByMatch);

module.exports = router;
