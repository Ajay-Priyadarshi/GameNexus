import { UserModel as User } from '../models/User.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).send(`
        <script>
          alert('Invalid User name try again.');
          window.location.href = '/login.html'; // Redirect to the login page if needed
        </script>
      `);
    }

    // Compare the entered password with the stored password directly
    if (password !== existingUser.password) {
      return res.status(401).send(`
        <script>
          alert('Incorrect password try again or forget password.');
          window.location.href = '/login.html'; // Redirect to the login page if needed
        </script>
      `);
    }
    req.session.userId = existingUser._id;
    if (existingUser.accountType === 'admin') {
      // Redirect to the admin dashboard
      return res.redirect('/admin/dashboard');
    } else if (existingUser.accountType === 'EVENT ORGANIZER') {
      // Redirect to the organiser's or home page
      return res.redirect('/HomePageEventOrganiser.html');
    }
    else {
      // Redirect to the user's profile or home page
      return res.redirect('/Homepage.html');
    }
    // return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle user registration
export const register = async (req, res, next) => {
  const { username, email, password, accountType, bio, securityQuestion, answer } = req.body;
  const photoFileName = req.file ? req.file.filename : null;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).send(`
      <script>
        alert('Username already exists. Please choose a different username.');
         window.location.href = '/auth/reg';
      </script>
    `);
    }

    const newUser = new User({
      username,
      email,
      password,
      accountType,
      bio,
      securityQuestion,
      answer,
      userPhoto: photoFileName,
    });

    await newUser.save();

    return res.status(201).send(`
    <script>
      alert('Registration successful. Welcome to the website!');
      window.location.href = '/login.html'; 
    </script>
  `);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Function to handle forgot password step 1
export const forgotPasswordStep1 = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ question: null });
    }

    req.session.forgotPasswordUser = username;

    res.json({ question: user.securityQuestion });
  } catch (error) {
    console.error('Error during forgot password (step 1):', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to handle forgot password step 2
export const forgotPasswordStep2 = async (req, res) => {
  const { securityAnswer, newPassword, confirmPassword } = req.body;

  try {
    const username = req.session.forgotPasswordUser;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the entered security answer with the stored answer directly
    if (securityAnswer.toLowerCase() === user.answer.toLowerCase()) {
      if (newPassword === confirmPassword) {
        // Update the password without hashing
        user.password = newPassword;
        await user.save();

        return res.json({ success: true, message: 'Password reset successful' });
      } else {
        return res.status(400).json({ error: 'New password and confirm password do not match' });
      }
    } else {
      return res.status(401).json({ error: 'Incorrect security answer' });
    }
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
