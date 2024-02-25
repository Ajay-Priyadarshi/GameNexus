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
        const Content_URL = req.file.filename; // Assuming 'userPhoto' is the name attribute in the form

        const newPost = new Content({
            User_Id,
            Content_Type,
            Content_URL,
            Content_Description,
        });

        await newPost.save();

        res.redirect('/profile'); // Redirect to the homepage or any other desired page after post creation
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};