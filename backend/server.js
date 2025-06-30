import express from 'express';
import cors from 'cors';
import { connectDB } from './controllers/database.js';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import menuRouter from './routes/menuRoute.js';
import orderModel from './models/orderModel.js';





// Load environment variables from .env file
dotenv.config();

// App Config
const app = express();
const port =  5000;

// middleware
app.use(express.json());
app.use(cors());

connectDB();

// api endpoints
app.use('/api/food',foodRouter);
app.use('/api/menu',menuRouter)
app.use('/images',express.static('uploads'));
app.use('/menu/images',express.static('menuImages'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


app.patch('/api/order/update/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




app.get('/',(req,res)=>{
    res.send('API Working')
})
app.listen(port ,() =>{
    console.log('server running on ', port)
})
