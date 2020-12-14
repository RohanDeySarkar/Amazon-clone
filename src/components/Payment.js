import React, { useEffect, useState } from 'react';
import './Payment.css';

import axios from './axios';

import CheckoutProduct from './CheckoutProduct';
import {useStateValue} from './StateProvider';

import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import { Link, useHistory } from 'react-router-dom';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Card } from '@material-ui/core';

function Payment() {

    const history = useHistory();

    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate a clientSecret whenever basket value changes
        const getClientSecret = async() => {
            const response = await axios({
                method: 'post',
                // Stripe expect the total in a a currency subunit (1$ => 100 cent)
                url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        };

        getClientSecret();

    }, [basket]);

    console.log('SECRET >>>>', clientSecret);

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false)

            history.replace('/orders')
        })
    };

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout"> {basket?.length} items </Link>)
                </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Incubator of Erlich Bachman</p>
                        <p>Silicone Valley, CA</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>

                    <div className="payment__items">
                        {basket.map((item) => (
                            <CheckoutProduct 
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                            /> 
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
