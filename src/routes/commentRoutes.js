// commentRoutes.js
import express from "express";
import { getComment } from "../controllers/commentController.js";

const router = express.Router();

router.get('/', getComments);

export default router;
