// routes/matches.js
const router = require('express').Router();
const { protect } = require('../middleware/auth');
const c = require('../controllers/matchController');

router.route('/')
  .get(protect, c.getMatches)
  .post(protect, c.createMatch);

router.route('/:id')
  .get(protect, c.getMatch)
  .put(protect, c.updateMatch)
  .delete(protect, c.deleteMatch);

module.exports = router;
