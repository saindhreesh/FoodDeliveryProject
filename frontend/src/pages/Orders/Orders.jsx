import axios from 'axios';
import React, { useContext, useState, useEffect  } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './Order.css';
import { useNavigate } from 'react-router-dom';

const Orders = ({ token }) => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(
          `${url}/api/order/user`,
          { headers: { token } }
        );
        setOrders(response.data.orders || []);
        console.log(orders)
      } catch (error) {
        setOrders([]);
      }
    };
    fetchUserOrders();
  }, [url, token]);

  return (
    <div className="orders-admin">
      <h2>Your Orders</h2>
      {orders.length > 0? <table className="orders-table">
        <thead>
          <tr>
            <th>Items</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>
                <ul className="order-items">
                  {order.items && order.items.map(item => (
                    <li key={item._id}>
                      <img src={`${url}/images/${item.image}`} alt="" className='item-image' />
                      <b>{item.name}</b> x{item.quantity}<br />
                      <span>{item.category}</span>
                    </li>
                  ))}
                </ul>
              </td>
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
              <td>{order.date ? new Date(order.date).toLocaleString() : ''}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table> : <><p className='order-status'>No Previous Orders in Your Account , Please Order your Tasty Food at <a onClick={()=>{navigate('/')}}>Tomato🍕</a> ......</p></>}

    </div>
  );
};

export default Orders;
