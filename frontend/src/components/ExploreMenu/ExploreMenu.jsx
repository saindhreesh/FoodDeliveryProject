import React, { useContext }  from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';
// import { menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory}) => {
 const {url, menu_list} = useContext(StoreContext);
  return (
    <div className='explore-menu' id='menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis commodi modi eius, ipsam quisquam provident cumque illo doloremque id ex facere minima odio nam saepe quasi laboriosam aliquam eos! Eos.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return <div onClick={() => { setCategory((prev) => prev === item.menu_name ? "All" : item.menu_name) }} key={index} className='explore-menu-list-item'>
            <img className={category === item.menu_name ? "active" : ''} src={url+"/menu/images/"+item.menu_image} alt="" />
            <p>{item.menu_name}</p>

          </div>
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
