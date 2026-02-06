const User = require('../models/User');

// @desc    Add skill to user
// @route   POST /api/skills
// @access  Private
exports.addSkill = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    const user = await User.findById(req.user._id);

    // Check if skill already exists
    const skillExists = user.skills.find(
      skill => skill.name.toLowerCase() === name.toLowerCase()
    );

    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    user.skills.push({
      name,
      category: category || 'Other'
    });

    await user.save();
    res.status(201).json(user.skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove skill from user
// @route   DELETE /api/skills/:skillId
// @access  Private
exports.removeSkill = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.skills = user.skills.filter(
      skill => skill._id.toString() !== req.params.skillId
    );

    await user.save();
    res.json(user.skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's skills
// @route   GET /api/skills
// @access  Private
exports.getMySkills = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
