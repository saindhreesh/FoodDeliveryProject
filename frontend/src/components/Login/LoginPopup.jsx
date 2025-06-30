import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'

const LoginPopup = () => {
    const [currentState, setCurrentState] = useState('Sign Up');
    const { url, setToken, token,setShowLogin } = useContext(StoreContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((currentvalue) => {
            return {
                ...currentvalue,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += '/api/user/login'
        }
        else {
            newUrl += '/api/user/register'
        };

        const response = await axios.post(newUrl, data)
        if (response.data.success) {
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }

    }
    useEffect(()=>{

    },[token])

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login'
                        ? <></>
                        : <input name='name' type="text" placeholder='Your Name' value={data.name} onChange={handleChange} required />}
                    <input name='email' type="text" placeholder='Your Email' onChange={handleChange} value={data.email} required />
                    <input name='password' type="password" placeholder='Password' onChange={handleChange} value={data.password} required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? 'Create Account' : "Login"}</button>
                <div className="login-popup-con">
                    <input type="checkbox" required />
                    <p>By Continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currentState === 'Login'
                    ? <p>Create a New Account? <span onClick={() => setCurrentState('Sign Up')} >Click Here</span></p>
                    : <p>Already have an Account? <span onClick={() => setCurrentState('Login')}>Login</span></p>
                }
            </form>


        </div>
    )
}

export default LoginPopup
