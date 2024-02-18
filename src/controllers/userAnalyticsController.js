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

        // Process the data to match the expected format
        const analyticsData = userAnalyticsData.reduce((result, item) => {
            result[item._id] = item.count;
            return result;
        }, {});
        res.render('userAnalytics', { analyticsData });
    } catch (error) {
        console.error('Error fetching user analytics data:', error);
        res.status(500).send('Internal Server Error');
    }
};