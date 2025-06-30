import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
  return (
    <div className='appdownload' id='mobile-app'>
        <p>For Better Experience Download <br /> Tomato App</p>
        <div className="app-download-refe">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}
import './AppDownload.css'

export default AppDownload
