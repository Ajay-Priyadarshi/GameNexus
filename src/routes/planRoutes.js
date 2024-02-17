// planRoutes.js

import express from 'express';
import { showPlans, showAddPlanForm, addPlan, showEditPlanForm, editPlan, deletePlan } from '../controllers/planController.js';

const router = express.Router();

router.get('/', showPlans);
router.get('/add', showAddPlanForm);
router.post('/addF', addPlan);
router.get('/edit/:planId', showEditPlanForm);
router.post('/editF/:planId', editPlan);
router.get('/delete/:planId', deletePlan);

export default router;
