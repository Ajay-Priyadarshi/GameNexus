import express from 'express';

const router = express.Router();

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'aboutUs.html'));
});

export default router;