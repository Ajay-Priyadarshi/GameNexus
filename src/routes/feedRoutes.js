// searchRoutes.js
import express from "express";
import { showFeed } from "../controllers/feedController.js";

const router = express.Router();

router.get('/', showFeed);

export default router;
