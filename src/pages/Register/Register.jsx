import React from 'react'
import './register.css'
const Register = () => {
    const logoBeggining = "</>";
  return (
    <div className='registerContainer'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">{logoBeggining} Dev Social</h3>
                <span className="registerDesc">Connect with other devs and share your knowledge!</span>
            </div>
            <div className="registerRight">
                <div className="registerBox">
                    <input type="text" placeholder='Username' className="registerInput" />
                    <input type="Email" placeholder='Email' className="registerInput" />
                    <input type="Password" placeholder='Password' className="registerInput" />
                    <input type="Password" placeholder='Password' className="registerInput" />
                    <button className="registerButton">Sign up</button>
                    <button className="loginButton">Log into Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register