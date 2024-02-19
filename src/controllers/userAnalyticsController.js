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

export const userList = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({});

        // Include all users in the activeUsers array
        const activeUsers = users;
        const inactiveUsers = [];
        res.render('userList', { activeUsers, inactiveUsers });
    } catch (error) {
        console.error('Error fetching user list:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            // User not found
            return res.status(404).send('User not found');
        }

        // Delete the user from the database
        await User.findByIdAndDelete(userId);

        // Redirect back to the user list
        res.redirect('/userAnalytics/userList');
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).send('Internal Server Error');
    }
};