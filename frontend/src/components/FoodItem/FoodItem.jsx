import React, { useContext, useState } from 'react';
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, description, price, image }) => {
  const {  addToCart, removeFromCart, url, token } = useContext(StoreContext);
  const { cartItems = {} } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    if (removeFromCart) {
      await removeFromCart(id);
    }
    setLoading(false);
  };

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img src={url + '/images/' + image} alt="" className='food-item-image' />
        {
          !cartItems[id] ? <img className='add' src={assets.add_icon_white} alt="" onClick={() => { addToCart(id) }} /> :
          token ?  <div className='food-item-counter'>
              <img src={assets.remove_icon_red} alt="" onClick={handleRemove} style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }} />
              <p>{cartItems[id]}</p>
              <img src={assets.add_icon_green} alt="" onClick={() => { addToCart(id) }} />
            </div>:<></>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-description'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem;
