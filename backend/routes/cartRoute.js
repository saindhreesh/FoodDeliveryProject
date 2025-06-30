import express from 'express';
import { addToCart,removerFromCart,getCart } from '../controllers/cartControler.js';
import authmiddleware from '../middleware/path.js';

const cartRouter = express.Router();

cartRouter.post('/add',authmiddleware,addToCart);
cartRouter.post('/remove',authmiddleware,removerFromCart);
cartRouter.post('/get',authmiddleware,getCart);


export default cartRouter;