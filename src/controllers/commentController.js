import { ContentModel as Content } from '../models/Contents.js';
import { CommentModel as Comment } from '../models/Comment.js';
import { UserModel as User } from '../models/User.js';

export const getComments = async (req, res) => {
    const userId = req.session.userId;
    const postId = req.params.postId;

    try {
        const user = await User.findById(userId);
        const post = await Content.findById(postId)
            .populate('User_ID')
            .exec();
        const comments = await Comment.find({ Content_ID: postId })
            .populate('User_ID', 'username _id')
            .exec();

        res.render('comment', { user, post, comments });
        
    } catch (error) {
        console.error("error");
        res.status(500).send('Internal Server Error');
    }
}

export const createComment = async (req, res) => {
    const userId = req.session.userId;
    const { Content_ID, Comment_Description } = req.body;

    try {
        const newComment = new Comment({
            Content_ID: Content_ID,
            User_ID: userId,
            Comment_Description: Comment_Description
        });
        await newComment.save();
        return res.status(200).send(`
        <script>
          alert('Comment added.');
          window.location.href = '/comment/${Content_ID}';
        </script>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}