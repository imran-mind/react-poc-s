import React, { useState, useEffect } from 'react'
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import { auth } from './firebase';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

   
    const login = (e) =>{
        e.preventDefault();// this stops the refresh
        auth.signInWithEmailAndPassword(email,password)
            .then((auth)=>{
                console.log('Loggedin ',auth)
                //loggedin, redirect to homepage
                history.push('/')
            }).catch((err)=>{
                alert(err.message);
            })
    }

    const register = (e) =>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                console.log('Register ',auth)
                //created a user and loggedin , redirect to homepage
                history.push('/')
            }).catch((err)=>{
                alert(err.message)
            })
    }
    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt=""/>
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="text"/>
                    <h5>Password</h5>
                    <input value={password} onChange={e=>setPassword(e.target.value)} type="password"/>
                    <button
                        onClick={login}
                        type="submit" className="login__signinButton">Sign In</button>
                </form>
                <p>By signing-in you agree to Amazon's Conditions of Use &amp; Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                <button
                onClick={register}
                className="login__registerButton">Create Your Amazon Accoutn</button>
            </div>
        </div>
    )
}

export default Login
