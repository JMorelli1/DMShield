import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import headerImage from "../../assets/dice.jpeg";
import './Login.css';

import {loginUser, useAuthState, useAuthDispatch } from '../../redux/context/Context';
 
function Login(props) {

  const [email ,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
  }

  return (
    <div className="container">
      <Header image={headerImage}/>
      <Content className="app-content">
      <div className="formContainer">
        <h1>Login Page</h1>
 
        <form>
          <div className="loginForm">
            <div className="loginFormItem">
              <label htmlFor='email'>Username</label>
              <input type='text' id='email' />
            </div>
            <div className="loginFormItem">
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' />
            </div>
          </div>
          <button onClick={handleLogin}>login</button>
        </form>
      </div>
      </Content>
    </div>
  );
}
 
export default Login;