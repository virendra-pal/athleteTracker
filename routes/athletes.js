const router = require('express').Router();
const { protect } = require('../middleware/auth');
const c = require('../controllers/athleteController');

router.route('/')
  .get(protect, c.getAthletes)
  .post(protect, c.createAthlete);

router.route('/:id')
  .get(protect, c.getAthlete)
  .put(protect, c.updateAthlete)
  .delete(protect, c.deleteAthlete);

module.exports = router;
