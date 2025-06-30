import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/all');
        setOrders(response.data.orders || response.data.response || []);
      } catch (err) {
        console.error("Error fetching orders", err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Use correct backend route for status update
      const response = await axios.patch(`http://localhost:5000/api/order/update/${orderId}`, {
        status: newStatus
      });
      // Update local state after successful update
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="orders-admin">
      <h2>All Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Items</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>₹{order.amount}</td>
              <td>
                {order.paymentStatus === 'Success' || order.paymentStatus === true ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}>Successful</span>
                ) : (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Failed</span>
                )}
                <br />
                <span>{order.paymentType}</span>
              </td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>
                <ul className="order-items">
                  {order.items.map(item => (
                    <li key={item._id}>
                      <b>{item.name}</b> x{item.quantity}<br />
                      <span>₹{item.price} | {item.category}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div className="order-address">
                  {order.address.firstName} {order.address.lastName}<br />
                  {order.address.street}, {order.address.city}<br />
                  {order.address.state}, {order.address.zipcode}<br />
                  {order.address.country}<br />
                  {order.address.email}<br />
                  {order.address.phone}
                </div>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Food Processing">Food Preparing</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
