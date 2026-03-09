const User = require('../models/User');
const Endorsement = require('../models/Endorsement');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { 'skills.name': { $regex: search, $options: 'i' } }
        ]
      };
    }

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get endorsements for this user
    const endorsements = await Endorsement.find({ endorsedUser: req.params.id })
      .populate('endorser', 'name email')
      .sort('-createdAt');

    res.json({ user, endorsements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, username, socialLinks } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.bio = bio !== undefined ? bio : user.bio;

      // Handle username update
      if (username !== undefined) {
        if (username) {
          const existingUser = await User.findOne({ username: username.toLowerCase() });
          if (existingUser && existingUser._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: 'Username already taken' });
          }
          user.username = username.toLowerCase();
        } else {
          user.username = undefined;
        }
      }

      // Handle social links update
      if (socialLinks) {
        if (socialLinks.github !== undefined) {
          if (socialLinks.github) {
            const existingGithub = await User.findOne({ 'socialLinks.github': socialLinks.github });
            if (existingGithub && existingGithub._id.toString() !== user._id.toString()) {
              return res.status(400).json({ message: 'GitHub link already in use' });
            }
            user.socialLinks.github = socialLinks.github;
          } else {
            user.socialLinks.github = undefined;
          }
        }
        
        if (socialLinks.linkedin !== undefined) {
          if (socialLinks.linkedin) {
            const existingLinkedin = await User.findOne({ 'socialLinks.linkedin': socialLinks.linkedin });
            if (existingLinkedin && existingLinkedin._id.toString() !== user._id.toString()) {
              return res.status(400).json({ message: 'LinkedIn link already in use' });
            }
            user.socialLinks.linkedin = socialLinks.linkedin;
          } else {
            user.socialLinks.linkedin = undefined;
          }
        }
        
        if (socialLinks.portfolio !== undefined) {
          if (socialLinks.portfolio) {
            const existingPortfolio = await User.findOne({ 'socialLinks.portfolio': socialLinks.portfolio });
            if (existingPortfolio && existingPortfolio._id.toString() !== user._id.toString()) {
              return res.status(400).json({ message: 'Portfolio link already in use' });
            }
            user.socialLinks.portfolio = socialLinks.portfolio;
          } else {
            user.socialLinks.portfolio = undefined;
          }
        }
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        socialLinks: updatedUser.socialLinks
      });
    }
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: 'Unique field already in use' });
    }
    res.status(500).json({ message: error.message });
  }
};
