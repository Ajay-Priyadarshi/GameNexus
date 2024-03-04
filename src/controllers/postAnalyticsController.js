import { UserModel as User } from '../models/User.js';
import { ContentModel as Content } from '../models/Contents.js';

export const showanalytics = async (req, res) => {
    try {
        const postAnalyticsData = await User.aggregate([
            {
                $lookup: {
                    from: 'Content_tbl',
                    localField: '_id',
                    foreignField: 'User_ID',
                    as: 'posts'
                }
            },
            {
                $addFields: {
                    postCount: { $size: '$posts' } 
                }
            },
            {
                $match: {
                    accountType: { $ne: 'admin' } 
                }
            },
            {
                $group: {
                    _id: '$_id',
                    username: { $first: '$username' },
                    postCount: { $sum: '$postCount' }
                }
            }
        ]);

        const analyticsData = {};
        postAnalyticsData.forEach(item => {
            analyticsData[item.username] = item.postCount;
        });

        res.render('postAnalytics', { analyticsData });
    } catch (error) {
        console.error('Error fetching user analytics data:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const userList = async (req, res) => {
    try {
        const activeUsers = await User.find({ accountStatus: 'Active' });
        const inactiveUsers = await User.find({ accountStatus: 'Deactivated' });
        res.render('userList', { activeUsers, inactiveUsers });
    } catch (error) {
        console.error('Error fetching user list:', error);
        res.status(500).send('Internal Server Error');
    }
}