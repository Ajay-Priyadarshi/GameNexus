import { ContentModel as Content } from '../models/Contents.js';
import { LikeModel as Like } from '../models/Like.js';

export const likeContent = async (req, res) => {
    try {
        const postId = req.params.postId;
        const guestId = req.params.userId;
        const userId = req.session.userId;
        
        const like = new Like({
            User_Id: userId,
            Content_Id: postId,
        });

        await like.save();
        await Content.findByIdAndUpdate(postId, { $inc: { Like_Count: 1 } });

        return res.status(200).send(`
        <script>
          alert('Post liked.');
          window.location.href = '/profile/${guestId}';
        </script>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};