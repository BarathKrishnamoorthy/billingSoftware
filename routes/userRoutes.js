import express from 'express';
import {
loginHotel,
  createHotel,
  editHotel,
  deleteHotel,
  generateEmployeeId
} from '../controllers/userController.js';
const router = express.Router();

router.post('/login', loginHotel);
router.post('/create-hotel', createHotel);
router.put('/edit-hotel/:id', editHotel);
router.delete('/delete-hotel/:id', deleteHotel);
router.get('/generate-employee-id', generateEmployeeId);


export default router;