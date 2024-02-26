// followRoutes.js
import express from "express";
import { getRequests, sendRequest } from "../controllers/followController.js";

const router = express.Router();

router.get('/getRequests', getRequests);
router.get('/sendRequest/:followingId', sendRequest); //passing th id of the person to be followed

export default router;