import Order from '../models/orderModel.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const placeOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ success: true, message: 'Order placed successfully' });
    await userModel.findByIdAndUpdate(
       { _id: req.body.userId },
      { cartData: {} },
    )
} catch (err) {
  console.log(err);
  res.status(500).json({ success: false, message: 'Error saving order' });
}
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, response: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const getSpecificUserOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
      console.log("Error to Fetch the User Orders");
      return res.json({ success: false, message: "No orders found for this user" });
    }
    res.json({ success: true, orders, message: 'User Orders Fetched Successfully' });
  } catch (err) {
    res.json({ success: false, message: 'Failed to fetch User Orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};
