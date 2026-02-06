const express = require('express');
const router = express.Router();
const { addSkill, removeSkill, getMySkills } = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.post('/', auth, addSkill);
router.get('/', auth, getMySkills);
router.delete('/:skillId', auth, removeSkill);

module.exports = router;
