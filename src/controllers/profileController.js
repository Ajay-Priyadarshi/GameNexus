// profileController.js
import { UserModel as User } from '../models/User.js';

export const showProfile = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('profile', { user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('editProfile', { user });
  } catch (error) {
    console.error('Error fetching user profile for editing:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.session.userId;

    const updatedData = {
      username: req.body.username,
      bio: req.body.bio,
      requirements: req.body.requirements
    };

    // Check if a new profile photo is uploaded
    if (req.file) {
      updatedData.userPhoto = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.save();
    res.redirect('/profile');
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send('Internal Server Error');
  }
};
