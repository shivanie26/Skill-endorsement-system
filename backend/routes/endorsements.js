const express = require('express');
const router = express.Router();
const {
  createEndorsement,
  getReceivedEndorsements,
  getGivenEndorsements,
  deleteEndorsement,
  getEndorsementCount
} = require('../controllers/endorsementController');
const auth = require('../middleware/auth');

router.post('/', auth, createEndorsement);
router.get('/received', auth, getReceivedEndorsements);
router.get('/given', auth, getGivenEndorsements);
router.get('/count/:userId', auth, getEndorsementCount);
router.delete('/:id', auth, deleteEndorsement);

module.exports = router;
