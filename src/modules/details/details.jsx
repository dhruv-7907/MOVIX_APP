import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/detailsBanner';
import Cast from './cast/cast';
import Similar from './similar/similar';
import VideosSection from './videosection/videosection';
import *as Action from '../../Redux/detailPage/detail_Action';
import { useDispatch } from 'react-redux';
import './style.scss'
import Recommondation from './Recommondation/recommondation';
function Details(props) {

    const [relatedVideo, setrelatedVideo] = useState()
    const [creadits, setcredits] = useState()
    const dispatch = useDispatch()
    const { mediaType, Id } = useParams()

    useEffect(() => {
        getReletedVideo()
        getCredits()
    }, [mediaType, Id])

    const getReletedVideo = async () => {
        const responce = await dispatch(Action.getReletedVideo(`/${mediaType}/${Id}/videos`))
        // console.log("responce -", responce)
        setrelatedVideo(responce)
    }

    // console.log("relatedVideo -", relatedVideo)

    const getCredits = async () => {
        const responce = await dispatch(Action.getCredits(`/${mediaType}/${Id}/credits`))
        setcredits(responce)
    }

    // console.log("creadits", creadits)
    return (
        <div>
            <DetailsBanner video={relatedVideo?.results[0]} crew={creadits?.crew} />
            <Cast Cast={creadits?.cast} />
            <VideosSection data={relatedVideo} />
            <Similar mediaType={mediaType} Id={Id} />
            <Recommondation mediaType={mediaType} Id={Id} />
            {/* <DetailsBanner /> */}
        </div>
    );
}

export default Details;