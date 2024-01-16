// profileController.js
import { UserModel } from '../models/User.js';

export const showProfile = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const user = await UserModel.findById(userId);

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
