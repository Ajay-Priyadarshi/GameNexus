// followRoutes.js
import express from "express";
import { getRequests, sendRequest } from "../controllers/followController.js";

const router = express.Router();

router.get('/getRequests', getRequests);
router.get('/sendRequest', sendRequest);

export default router;