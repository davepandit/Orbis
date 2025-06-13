import express from "express";

const router = express.Router();

router.post('/create-event', createEvent); // NOTE - This needs an event admin middleware 
router.post('/')
export default router;
