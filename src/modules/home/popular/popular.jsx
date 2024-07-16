import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../../shared/contentWrapper/contentWrapper'
import SwitchTab from '../../../shared/switchTab/switchTab';
import *as  action from '../../../Redux/homePage/home_Actions';
import { useDispatch } from 'react-redux';
import Carousel from '../../../shared/carousel/carousel';

function Popular(props) {
    const [endpoint, setendpoint] = useState("movie")
    const [trendingShowaData, settrendingShowaData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        popularShow()
    }, [endpoint])

    const popularShow = async () => {
        const responce = await dispatch(action.popularShow(endpoint));
        settrendingShowaData(responce)
    }

    const onTabChange = (tab) => {
        setendpoint(tab === "Movies" ? "movie" : "tv")
    }
    return (
        <>
            <ContentWrapper>
                <div className="carouselSection">
                    <ContentWrapper>
                        <span className='carouselTitle'>Popular</span>
                        <SwitchTab data={["Movies", "Tv show"]} onTabChange={onTabChange} />
                    </ContentWrapper >
                    <Carousel data={trendingShowaData} endpoint={endpoint} />
                </div>
            </ContentWrapper>
        </>
    );
}

export default Popular;