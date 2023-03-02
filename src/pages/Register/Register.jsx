import React, { useRef } from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const logoBeggining = "</>";
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()
    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match!")
        } else {

            const user = {
                username: username.current.value,
                email : email.current.value,
                password : password.current.value,
            }
            try{
                await axios.post("/auth/register", user);
                navigate('/login')

            }catch(err){
                console.log(err)
            }
           
        }
       
    };
  return (
    <div className='registerContainer'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">{logoBeggining} Dev Social</h3>
                <span className="registerDesc">Connect with other devs and share your knowledge!</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input type="text" placeholder='Username' className="registerInput" ref={username} required/>
                    <input type="Email" placeholder='Email' className="registerInput" ref={email} required/>
                    <input type="Password" placeholder='Password' className="registerInput"
                     ref={password}
                     minLength='6'
                     required />
                    <input type="Password" placeholder='Password' className="registerInput" required  minLength='6' ref={passwordAgain} />
                    <button className="registerButton" type='submit'>Sign up</button>
                    <button className="loginButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register