import React from 'react';
import './style.scss'
import HeroBanner from './heroBanner/heroBanner';
import Trending from './trending/trending';
import Popular from './popular/popular';
function Home(props) {
    return (
        <div>
            <HeroBanner />
            <Trending />
            <Popular />
        </div>
    );
}

export default Home;