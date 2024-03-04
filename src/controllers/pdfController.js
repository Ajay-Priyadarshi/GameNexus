import puppeteer from 'puppeteer';
import { UserModel as User } from '../models/User.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const userAnalytics = async (req, res) => {
    try {
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

        // Adjust the template path using path.resolve
        const templatePath = path.resolve(__dirname, '../../template/tempUserAnalytics.ejs');
        const htmlContent = await ejs.renderFile(templatePath, { analyticsData });

        // Configuration for the PDF generation using Puppeteer
        const pdfPath = path.resolve(__dirname, '../../pdf/UserAnalyticsReport.pdf');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        await page.pdf({ path: pdfPath, format: 'A4' });
        await browser.close();

        res.render('userAnalytics', { analyticsData });
    } catch (error) {
        console.error('Error fetching user analytics data:', error);
        res.status(500).send('Internal Server Error');
    }
};
