import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/home/home';
import Details from './modules/details/details';
import SearchResult from './modules/searchResult/searchResult';
import Explore from './modules/explore/explore';
import Page404 from './modules/404/page404';
import Header from './shared/header/header';
import Footer from './shared/footer/footer';
function AppRoutes(props) {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/:mediaType/:Id' element={<Details />} />
                    <Route path='/search/:query' element={<SearchResult />} />
                    <Route path='/explore/:mediaType' element={<Explore />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default AppRoutes;