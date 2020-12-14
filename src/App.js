import React, { useEffect } from "react";
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Payment from './components/Payment';

import {Switch, Route} from 'react-router-dom';
import { auth } from "./firebase";
import { useStateValue } from "./components/StateProvider";

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51Ht40aENgl6Ii0zjdQU2bw9ar0ippg0gnOq1UvloUkoeAp0W1KrIkqa7Tyv3HOAtbDFLhVzYTr3TBzhun4bynS1W00IG4Aw2Q5');

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser=> {
      // console.log('The user -->', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })

  }, []);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
