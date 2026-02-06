const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.put('/profile', auth, updateProfile);

module.exports = router;
