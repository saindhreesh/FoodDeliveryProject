import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '',
    state: '', zipcode: '', country: '', phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderItems = food_list.filter(item => cartItems[item._id]).map(item => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: cartItems[item._id],
      image: item.image,
      category: item.category
    }));

    const address = { ...data };
    const amount = getTotalCartAmount() + 2;

    try {
      const razorpayRes = await axios.post(`${url}/api/order/place`, { amount });
      if (razorpayRes.data?.orderId) {
        const options = {
          key: 'rzp_test_lldoXfZ2jw8oGD',
          amount: razorpayRes.data.amount,
          currency: razorpayRes.data.currency,
          name: 'Food Delivery',
          description: 'Order Payment',
          order_id: razorpayRes.data.orderId,
          handler: async function (response) {
            try {
              await axios.post(`${url}/api/order/confirm`, {
                items: orderItems,
                amount,
                address,
                paymentType: 'Online',
                paymentStatus: 'Success'
              }, {
                headers: { token }
              });
              setCartItems({});
              alert('Order placed successfully!');
              navigate('/');
            } catch (err) {
              console.error('Order saving failed:', err);
              alert('Order save failed after payment!');
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone
          },
          theme: { color: '#3399cc' }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Error placing order.');
    }
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name='firstName' value={data.firstName} onChange={handleChange} placeholder='First Name' required />
          <input type="text" name='lastName' value={data.lastName} onChange={handleChange} placeholder='Last Name' />
        </div>
        <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Email Address' required />
        <input type="text" name='street' value={data.street} onChange={handleChange} placeholder='Street' required />
        <div className="multi-fields">
          <input type="text" name='city' value={data.city} onChange={handleChange} placeholder='City' required />
          <input type="text" name='state' value={data.state} onChange={handleChange} placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" name='zipcode' value={data.zipcode} onChange={handleChange} placeholder='Zip Code' required />
          <input type="text" name='country' value={data.country} onChange={handleChange} placeholder='Country' required />
        </div>
        <input type="text" name='phone' value={data.phone} onChange={handleChange} placeholder='Phone Number' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹2</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{getTotalCartAmount() + 2}</p>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrderPage;
