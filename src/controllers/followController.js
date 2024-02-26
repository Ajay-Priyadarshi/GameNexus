// searchController.js
import { UserModel as User } from '../models/User.js';
import { FollowRequestModel as Follow } from '../models/Follow.js';

export const sendRequest = async (req, res) => {
    try {
        const followingId = req.params.followingId;
        const followerId = req.session.userId;
        
        const followRequest = new Follow({
            User_ID: followerId,
            Request_Status: 'Pending',
            Follower_ID: followingId,
        });

        await followRequest.save();
        await User.findByIdAndUpdate(followingId, { $inc: { followRequestCount: 1 } });

        return res.status(200).send(`
        <script>
          alert('Request Sent.');
          window.location.href = '/profile/${followingId}';
        </script>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};

export const getRequests = async (req, res) => {

};
