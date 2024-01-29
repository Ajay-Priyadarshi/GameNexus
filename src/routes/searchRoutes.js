// searchRoutes.js
import express from "express";
import { search } from "../controllers/searchController.js";

const router = express.Router();

router.get('/', search);

router.get('/search_options', (req, res) => {
    res.render('search_options'); 
});

export default router;
