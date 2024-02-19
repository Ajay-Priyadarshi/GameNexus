// userAnalyticsController.js
import { UserModel as User } from '../models/User.js';

export const showanalytics = async (req, res) => {
    try {
        // Fetch data from the User_Data_tbl
        const userAnalyticsData = await User.aggregate([
            {
                $group: {
                    _id: '$accountType',
                    count: { $sum: 1 }
                }
            }
        ]);

        const analyticsData = {};
        userAnalyticsData.forEach(item => {
            analyticsData[item._id] = item.count;
        });

        res.render('userAnalytics', { analyticsData });
    } catch (error) {
        console.error('Error fetching user analytics data:', error);
        res.status(500).send('Internal Server Error');
    }
};
