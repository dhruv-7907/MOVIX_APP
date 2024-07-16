import React, { useEffect, useState } from 'react';
import './style.scss'
import *as action from '../../../Redux/homePage/home_Actions';
import Img from '../../../shared/lazyLoadImage/img';

import ContentWrapper from '../../../shared/contentWrapper/contentWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function HeroBanner(props) {
    const [background, setbackground] = useState("")
    const [query, setquery] = useState("")
    const navigate = useNavigate()
    const { backdrop } = useSelector((state) => state.homepage.url)
    const dispatch = useDispatch()


    useEffect(() => {

    })
    useEffect(() => {
        upComingMovie();
    }, [backdrop])

    const upComingMovie = async () => {
        const responce = await dispatch(action.upComingMovie());
        if (responce) {
            const bg = backdrop + responce?.results[Math.floor(Math.random() * 20)].backdrop_path
            setbackground(bg)
        }
    }

    const searchQueryHandler = (e) => {

        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-12 p-0">
                        <div className="heroBanner position-relative top-0  start-0 d-flex align-items-center ">
                            <div className="backdrop-img position-absolute">
                                <Img src={background} />
                            </div>
                            <div className="opacity-layer position-absolute start-0 bottom-0"></div>
                            <ContentWrapper>
                                <div className="heroBannerContent d-flex flex-column align-items-center ">
                                    <span className='title'>Welcome.</span>
                                    <span className='subTitle'>Millions of movies,Tv shows and pepole to discover.Explore Now.</span>
                                    <div className="searchInput">
                                        <input type="text"
                                            placeholder='Search for movie or tv show....'
                                            onChange={(e) => setquery(e.target.value)}
                                            onKeyUp={searchQueryHandler} />
                                        <button>Search</button>
                                    </div>
                                </div>
                            </ContentWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroBanner;