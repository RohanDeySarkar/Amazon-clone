import React from 'react';
import './Home.css';

import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                    className="home__image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
                    alt=""
                />

                <div className="home__row">
                    <Product 
                        id="122332"
                        title="Apple iPhone 12 (128GB, Blue)"
                        price={1649.99}
                        image="https://m.media-amazon.com/images/I/71ZOtNdaZCL._AC_UY327_FMwebp_QL65_.jpg"
                        rating={5}
                    />
                    <Product
                        id="12231" 
                        title="Xbox One S 1TB Console"
                        price={1118.99}
                        image="https://m.media-amazon.com/images/I/618mnBEJwNL._AC_UY327_FMwebp_QL65_.jpg"
                        rating={4}
                    />
                </div>

                <div className="home__row">
                    <Product 
                        id="122333"
                        title="Marvel’s Spider-Man: Miles Morales Launch Edition – PlayStation 5"
                        price={49.98}
                        image="https://m.media-amazon.com/images/I/71CqfmZX3PL._AC_UY327_FMwebp_QL65_.jpg"
                        rating={4}
                    />
                    <Product 
                        id="122337"
                        title="Echo Dot (3rd Gen) - Smart speaker with Alexa - Heather Gray"
                        price={59.99}
                        image="https://m.media-amazon.com/images/I/61KIcV26CdL._AC_UY327_FMwebp_QL65_.jpg"
                        rating={4}
                    />
                    <Product 
                        id="122367"
                        title="Fitbit Sense Advanced"
                        price={325.59}
                        image="https://m.media-amazon.com/images/I/71wEvOoTCvL._AC_UY327_FMwebp_QL65_.jpg"
                        rating={4}
                    />
                </div>

                <div className="home__row">
                <Product
                        id="12231" 
                        title="Sony A8H 65 Inch TV"
                        price={418.99}
                        image="https://m.media-amazon.com/images/I/61F0MXKMLwL._AC_UY327_FMwebp_QL65_.jpg"
                        rating={4}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
