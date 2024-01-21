// Example: searchController.js
import { UserModel as User } from '../models/User.js';

export const search = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const results = await User.find({ username: { $regex: searchTerm, $options: 'i' } });

        res.render('search', { results: results || [] });
    } catch (error) {
        console.error('Error performing search:', error);
        res.render('search', { results: [] }); // Provide an empty array if there's an error
    }
};