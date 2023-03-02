import React from 'react'
import { useRef } from 'react';
import './login.css'
import {loginCall} from '../../apiCalls'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
    const logoBeggining = "</>";
    const email = useRef()
    const password = useRef()
    const {user ,isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) =>{
        e.preventDefault();
        loginCall(
            {email: email.current.value, password: password.current.value},
             dispatch
        );
    };
    console.log(isFetching)
    console.log(user)
  return (
    <div className='loginContainer'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">{logoBeggining} Dev Social</h3>
                <span className="loginDesc">Connect with other devs and share your knowledge!</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="Email" placeholder='Email' className="loginInput" ref={email} />
                    <input
                    type="Password"
                    placeholder='Password'
                    className="loginInput"
                    ref={password}
                    required
                    minLength="6"
                    />
                    <button className="loginButton" disabled={isFetching} > 
                    {isFetching ? <CircularProgress color='inherit' size="20px"/> : "Log In"}
                    </button>
                    
                    <span className="loginForgot">Forgot password?</span>

                    <button className="loginRegisterButton" disabled={isFetching} >{ 
                    isFetching ? <CircularProgress color='inherit' size="20px"/> : "Create a new account"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login