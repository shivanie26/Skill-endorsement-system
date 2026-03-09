const User = require('../models/User');

// @desc    Add skill to user
// @route   POST /api/skills
// @access  Private
exports.addSkill = async (req, res) => {
  try {
    const { name, category, subcategory, proficiencyLevel } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    const user = await User.findById(req.user._id);

    // Check if skill with same proficiency already exists
    const skillExists = user.skills.find(
      skill => skill.name.toLowerCase() === name.toLowerCase() && 
               skill.proficiencyLevel === (proficiencyLevel || 'Intermediate')
    );

    if (skillExists) {
      return res.status(400).json({ 
        message: `Skill already exists with ${proficiencyLevel || 'Intermediate'} level. Choose a different proficiency level.` 
      });
    }

    user.skills.push({
      name,
      category: category || 'Other',
      subcategory: subcategory || '',
      proficiencyLevel: proficiencyLevel || 'Intermediate'
    });

    await user.save();
    res.status(201).json(user.skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update skill proficiency level
// @route   PUT /api/skills/:skillId
// @access  Private
exports.updateSkill = async (req, res) => {
  try {
    const { proficiencyLevel, category, subcategory } = req.body;
    const user = await User.findById(req.user._id);

    const skill = user.skills.id(req.params.skillId);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Check if updating to a proficiency level that already exists
    if (proficiencyLevel && proficiencyLevel !== skill.proficiencyLevel) {
      const skillWithNewLevel = user.skills.find(
        s => s.name.toLowerCase() === skill.name.toLowerCase() && 
             s.proficiencyLevel === proficiencyLevel
      );
      
      if (skillWithNewLevel) {
        return res.status(400).json({ 
          message: `Skill with ${proficiencyLevel} level already exists` 
        });
      }
      
      skill.proficiencyLevel = proficiencyLevel;
    }

    if (category) skill.category = category;
    if (subcategory !== undefined) skill.subcategory = subcategory;

    await user.save();
    res.json(user.skills);
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
