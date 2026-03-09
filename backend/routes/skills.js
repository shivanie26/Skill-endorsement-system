const express = require('express');
const router = express.Router();
const { addSkill, removeSkill, getMySkills, updateSkill } = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.post('/', auth, addSkill);
router.get('/', auth, getMySkills);
router.put('/:skillId', auth, updateSkill);
router.delete('/:skillId', auth, removeSkill);

module.exports = router;
