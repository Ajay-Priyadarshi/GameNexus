// commentRoutes.js
import express from "express";
import { getComments } from "../controllers/commentController.js";

const router = express.Router();

router.get('/:postId', getComments);

export default router;
