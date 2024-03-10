import moment from 'moment-timezone';
import { ContentModel as Content } from '../models/Contents.js';
import { UserModel as User } from '../models/User.js';

export const newPost = async (req, res) => {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    res.render('newPost', { user });
};

export const createPost = async (req, res) => {
    try {
        const { User_ID, Content_Description } = req.body;
        
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).send('Please upload an image or a video.');
        }

        // Determine the content type based on the file mimetype
        const Content_Type = req.file.mimetype.startsWith('image') ? 'image' : 'video';
        const Content_URL = req.file.filename;

        // Create a new post
        const newPost = new Content({
            User_ID,
            Content_Type,
            Content_URL,
            Content_Description,
            Content_Timestamp: moment.tz('Asia/Kolkata').format(),
        });

        // Save the new post to the database
        await newPost.save();

        // Increment the post count for the user
        await User.findByIdAndUpdate(User_ID, { $inc: { postCount: 1 } });

        // Send a success response with a script for redirection
        return res.status(200).send(`
        <script>
          alert('Post created.');
          window.location.href = '/profile';
        </script>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.session.userId;
        
        await Content.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(userId, { $inc: { postCount: -1 } });

        return res.status(200).send(`
        <script>
          alert('Post deleted.');
          window.location.href = '/profile';
        </script>
        `);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
