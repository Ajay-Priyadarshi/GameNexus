// searchController.js
import { UserModel as User } from '../models/User.js';
import { FollowRequestModel as Follow } from '../models/Follow.js';

export const sendRequest = async (req, res) => {
    try {
        const followingId = req.params.followingId; //jisko follow karna hai
        const followerId = req.session.userId;      //jo follow kar raha hai

        const followRequest = new Follow({
            User_ID: followingId,
            Request_Status: 'Pending',
            Follower_ID: followerId,
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
    try {
        const userId = req.session.userId;
        const requests = await Follow.find({ User_ID: userId, Request_Status: 'Pending' })
            .populate('Follower_ID', 'username userPhoto') 
            .exec();

        res.render('requests', { requests });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
