import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>foodymoody</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivety</li>
                <li>Preivacy policy</li>
            </ul>

            </div>
            <div className="footer-content-right">
                <h2>Get in TOUCH</h2>
                <ul>
                    <li>1234678900</li>
                    <li>as@gmail.com</li>
                    </ul>
                
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">copyright2023 soul</p>
      
    </div>
  )
}

export default Footer
