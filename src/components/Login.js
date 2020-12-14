import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';

import {auth} from '../firebase';

function Login() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log(email, password);

    const signIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(err => alert(err.message))
    };

    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(err => alert(err.message))
    };

    return (
        <div className="login">
            <Link to="/">
                <img 
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt=""
                />
            </Link>
            
            <div className="login__container">
                <h1>Sign-In</h1>

                <form>
                    <h5>E-mail</h5>
                    <input 
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <h5>Password</h5>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button 
                        onClick={signIn}
                        className="login__signInButton" 
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>

                <p>
                    By continuing, you agree to Amazon's FAKE CLONE Conditions of Use and Privacy Notice.
                </p>

                <button 
                    onClick={register}
                    className="login__registerButton"
                >
                    Create your Amazon account
                </button>
            </div>
        </div>
    )
}

export default Login
