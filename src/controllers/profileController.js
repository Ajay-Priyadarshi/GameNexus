// profileController.js
import { UserModel as User} from '../models/User.js';

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

    // Render the "profile.ejs" view with the user data
    res.render('profile', { user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Retrieve user data for editing
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.render('editProfile', { user });
  } catch (error) {
    console.error('Error during editProfile:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Update user data based on form submission
    // Assuming req.body contains the updated fields
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.redirect('/profile'); // Redirect to the profile page after updating
  } catch (error) {
    console.error('Error during updateProfile:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
