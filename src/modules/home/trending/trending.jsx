import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../../shared/contentWrapper/contentWrapper'
import SwitchTab from '../../../shared/switchTab/switchTab';
import *as  action from '../../../Redux/homePage/home_Actions';
import { useDispatch } from 'react-redux';
import Carousel from '../../../shared/carousel/carousel';
function Trending(props) {
    const [endpoint, setendpoint] = useState("day")
    const [trendingShowaData, settrendingShowaData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        trendingShow()
    }, [endpoint])

    const trendingShow = async () => {
        const responce = await dispatch(action.trendingShow(endpoint));
        settrendingShowaData(responce)
    }

    const onTabChange = (tab) => {
        setendpoint(tab === "Day" ? "day" : "week")
    }

    return (
        <>
            <ContentWrapper>
                <div className="carouselSection">
                    <ContentWrapper>
                        <span className='carouselTitle'>Trending  {endpoint}</span>

                        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
                    </ContentWrapper >
                    <Carousel data={trendingShowaData} />
                </div>
            </ContentWrapper>
        </>
    );
}

export default Trending;