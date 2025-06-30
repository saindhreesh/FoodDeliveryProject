import express from 'express';
import {
  placeOrder,
  confirmOrder,
  getAllOrders,
  updateOrderStatus,
  getSpecificUserOrder
} from '../controllers/orderControler.js';
import authmiddleware from '../middleware/path.js';

const router = express.Router();

router.post('/place', placeOrder);
router.post('/confirm', authmiddleware, confirmOrder);
router.get('/all', getAllOrders);
router.patch('/update/:id', updateOrderStatus);
router.get('/user',authmiddleware,getSpecificUserOrder);

export default router;
