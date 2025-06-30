import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets.js';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext.jsx';

const Navbar = () => {



    const [menu, setMenu] = useState('home');
    const { getTotalCartAmount, token, setToken, setShowLogin } = useContext(StoreContext);

    // Scroll to section by id
    const handleMenuClick = (section) => {
        setMenu(section);
        const el = document.getElementById(section);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/')

    }

    const ordersPage = () => {
        navigate('/orders')
    }


    const [showDropdown, setShowDropdown] = useState(false);

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar-profile')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);



    return (
        <div className='navbar'>
            <Link to={'/'} onClick={() => handleMenuClick('home')}> <img src={assets.logo} alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <li className={menu === 'home' ? 'active' : ''} onClick={() => handleMenuClick('home')}>home</li>
                <li className={menu === 'menu' ? 'active' : ''} onClick={() => handleMenuClick('menu')}>menu</li>
                <li className={menu === 'mobile-app' ? 'active' : ''} onClick={() => handleMenuClick('mobile-app')}>mobile-app</li>
                <li className={menu === 'contact-us' ? 'active' : ''} onClick={() => handleMenuClick('contact-us')}>contact Us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    {getTotalCartAmount() === 0 ? <img src={assets.basket_icon} alt="" /> : <Link to={'/cart'}> <img src={assets.basket_icon} alt="" /></Link>}

                    {getTotalCartAmount() !== 0 && (
                        <div className="dot"></div>
                    )}
                </div>
                {!token ? (
                  <button onClick={() => setShowLogin(true)}>Sign in</button>
                ) : (
                  <div className='navbar-profile'>
                    <img
                      src={assets.profile_icon}
                      onClick={e => {
                        e.stopPropagation();
                        setShowDropdown(!showDropdown);
                      }}
                      alt=""
                    />
                    {showDropdown && (
                      <ul
                        className='nav-profile-dropdown'
                        onClick={e => e.stopPropagation()}
                      >
                        <li> <img src={assets.bag_icon} alt="" /><p onClick={ordersPage}>Orders</p></li>
                        <hr />
                        <li><img src={assets.logout_icon} alt="" /><p onClick={logout}>Logout</p></li>
                      </ul>
                    )}
                  </div>
                )}
            </div>

        </div>
    )
}

export default Navbar
