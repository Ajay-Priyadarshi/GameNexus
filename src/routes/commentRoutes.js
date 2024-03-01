// commentRoutes.js
import express from "express";
import { getComments, createComment } from "../controllers/commentController.js";

const router = express.Router();

router.get('/:postId', getComments);
router.post('/create', createComment);

export default router;
