import express from "express";
import { showEvnet } from "../controllers/eventController.js";

const router = express.Router(); 

router.get('/showEvent', showEvent);

export default router;