import React, { useEffect } from 'react';
import '../style/login.css';
import { loginUrl } from '../spotify.jsx'
import logo from '../assets/logo.png'

function Login() {
  return (
    <div className="login">
        <img src={logo}
         alt="" 
         className="login__logo" />
         <a href = {loginUrl}
         className="login__button"
         >LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login
