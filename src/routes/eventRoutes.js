// eventRoutes.js

import express from 'express';
import { eventOrg, eventUsr, addEvent, createEvent, showEditEventForm, editEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/org', eventOrg);
router.get('/usr', eventUsr);

router.get('/add', addEvent);
router.post('/create', createEvent);
router.get('/edit/:eventId', showEditEventForm);
router.post('/editF/:eventId', editEvent);
router.get('/delete/:eventId', deleteEvent);


export default router;
