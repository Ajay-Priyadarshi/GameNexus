import { ContentModel as Content } from '../models/Contents.js';
import { UserModel as User } from '../models/User.js';

export const newPost = async (req, res) => {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    res.render('newPost', { user });
};
export const createPost = async (req, res) => {
    try {
        const { User_Id, Content_Type, Content_Description } = req.body;
        const Content_URL = req.file.filename;

        const newPost = new Content({
            User_Id,
            Content_Type,
            Content_URL,
            Content_Description,
        });

        await newPost.save();

        await User.findByIdAndUpdate(User_Id, { $inc: { postCount: 1 } });

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