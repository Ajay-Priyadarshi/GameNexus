// Example: searchController.js
import { UserModel as User } from '../models/User.js';
import { ContentModel as Content } from '../models/Contents.js';
import { CommentModel as Comment } from '../models/Comment.js';

export const getComments = async (req, res) => {
    const postId = req.params.postId;
    const post = await Content.findById(postId).populate('User_ID');
    try {
        const comments = await Comment.find({ Content_ID: postId }).populate('User_ID');
        res.render('comment', { post, comments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
