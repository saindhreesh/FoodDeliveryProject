import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: Array,
  amount: Number,
  address: Object,
  paymentType: String,
  paymentStatus: {
    type: String,
    enum: ['Success', 'Failed'],
    default: 'Failed'
  },
  status: {
    type: String,
    enum: ['Food Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Food Preparing'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
