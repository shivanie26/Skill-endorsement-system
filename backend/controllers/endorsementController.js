const Endorsement = require('../models/Endorsement');
const User = require('../models/User');

// @desc    Create endorsement
// @route   POST /api/endorsements
// @access  Private
exports.createEndorsement = async (req, res) => {
  try {
    const { endorsedUserId, skillName, message } = req.body;

    // Check if user exists
    const endorsedUser = await User.findById(endorsedUserId);
    if (!endorsedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has this skill
    const hasSkill = endorsedUser.skills.find(
      skill => skill.name.toLowerCase() === skillName.toLowerCase()
    );

    if (!hasSkill) {
      return res.status(400).json({ message: 'User does not have this skill' });
    }

    // Prevent self-endorsement
    if (req.user._id.toString() === endorsedUserId) {
      return res.status(400).json({ message: 'You cannot endorse yourself' });
    }

    // Create endorsement
    const endorsement = await Endorsement.create({
      endorser: req.user._id,
      endorsedUser: endorsedUserId,
      skillName,
      message
    });

    const populatedEndorsement = await Endorsement.findById(endorsement._id)
      .populate('endorser', 'name email')
      .populate('endorsedUser', 'name email');

    res.status(201).json(populatedEndorsement);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already endorsed this skill' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get endorsements received by user
// @route   GET /api/endorsements/received
// @access  Private
exports.getReceivedEndorsements = async (req, res) => {
  try {
    const endorsements = await Endorsement.find({ endorsedUser: req.user._id })
      .populate('endorser', 'name email')
      .sort('-createdAt');

    res.json(endorsements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get endorsements given by user
// @route   GET /api/endorsements/given
// @access  Private
exports.getGivenEndorsements = async (req, res) => {
  try {
    const endorsements = await Endorsement.find({ endorser: req.user._id })
      .populate('endorsedUser', 'name email')
      .sort('-createdAt');

    res.json(endorsements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete endorsement
// @route   DELETE /api/endorsements/:id
// @access  Private
exports.deleteEndorsement = async (req, res) => {
  try {
    const endorsement = await Endorsement.findById(req.params.id);

    if (!endorsement) {
      return res.status(404).json({ message: 'Endorsement not found' });
    }

    // Check if user is the endorser
    if (endorsement.endorser.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await endorsement.deleteOne();
    res.json({ message: 'Endorsement removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get endorsement count by skill for a user
// @route   GET /api/endorsements/count/:userId
// @access  Private
exports.getEndorsementCount = async (req, res) => {
  try {
    const endorsements = await Endorsement.find({ endorsedUser: req.params.userId });

    const skillCount = {};
    endorsements.forEach(endorsement => {
      skillCount[endorsement.skillName] = (skillCount[endorsement.skillName] || 0) + 1;
    });

    res.json(skillCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
