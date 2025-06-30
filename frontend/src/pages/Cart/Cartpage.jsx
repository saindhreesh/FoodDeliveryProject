import React, { useContext, useState } from 'react';
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cartpage = () => {
  const navigate =  useNavigate()
  const { food_list, cartItems, removeFromCart, getTotalCartAmount ,url} = useContext(StoreContext)
  return (
    <div className='cart'>
      <div className="cart-i">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cros' onClick={() => { removeFromCart(item._id) }}>X</p>
                </div>
                <hr />
              </React.Fragment>
            )
          }
        })}
      </div>
      <div className="cart-bot">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div><hr />
            <div className="cart-total-details">
              <p>Deleviery Fee</p>
              <p>${2}</p>
            </div><hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button onClick={()=>{navigate('/order')}}>Proceed to CheckOut</button>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a  Promocode , Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='pormo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cartpage
