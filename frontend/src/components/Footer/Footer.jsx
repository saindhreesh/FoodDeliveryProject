import React from 'react';
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='footer'id='contact-us'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum doloremque commodi, ipsam ut sequi, culpa magni sint deleniti a repellat reprehenderit, impedit tempora! Nihil recusandae accusamus cumque molestiae distinctio consequatur.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon}alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>
                        <a href="https://wa.me/9488959190" target="_blank" rel="noopener noreferrer">📞+91 9488959190</a>
                    </li>
                    <li>
                        <a href="mailto:saindhreesh@gmail.com" target="_blank">✉ saindhreesh@gmail.com</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 @ Tomato.com - All Right Reserved
        </p>
    </div>
  )
}

export default Footer
