import React from 'react'
import './login.css'
const Login = () => {
    const logoBeggining = "</>";
  return (
    <div className='loginContainer'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">{logoBeggining} Dev Social</h3>
                <span className="loginDesc">Connect with other devs and share your knowledge!</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input type="Email" placeholder='Email' className="loginInput" />
                    <input type="Password" placeholder='Password' className="loginInput" />
                    <button className="loginButton">Log in</button>
                    <span className="loginForgot">Forgot password?</span>
                    <button className="loginRegisterButton">Create a new account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login