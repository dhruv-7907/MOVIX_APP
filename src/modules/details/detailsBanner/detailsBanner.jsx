import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../../shared/contentWrapper/contentWrapper'
import *as Action from '../../../Redux/detailPage/detail_Action';
import posterFallback from '../../../assets/no-poster.png';
import Genres from '../../../shared/genres/genres';
import CircleRating from '../../../shared/circleRating/circleRating'
import { PlayIcon } from '../../../shared/playbtn/playbtn';
import VideoPopup from '../../../shared/videoPopup/videoPopup';
import './style.scss'
import dayjs from 'dayjs';

function DetailsBanner({ video, crew }) {

    // console.log("crew - ", crew)
    const [backdroppath, setbackdroppath] = useState(null)
    const [responce, setresponce] = useState('')
    const [posterpath, setposterpath] = useState(null)
    const [videoId, setvideoId] = useState(null)
    const [show, setShow] = useState(false)

    const { mediaType, Id } = useParams()
    const dispatch = useDispatch()

    const { poster, backdrop } = useSelector((state) => (state.homepage.url))
    const { genres } = useSelector((state) => state.homepage)
    const _genres = responce?.genres?.map((Item) => (Item.id))

    const director = crew?.filter((f) => f.job === "Director")
    const Writer = crew?.filter((f) => (f.job === "Screenplay" || f.job === "story" || f.job === "Writer"))

    useEffect(() => {
        getDetails();
    }, [mediaType, Id])

    const getDetails = async () => {
        const responce = await dispatch(Action.getDetails(`/${mediaType}/${Id}`))
        setresponce(responce)
        setbackdroppath(responce.backdrop_path)
        setposterpath(responce.poster_path)
    }
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <>
            <div className='detailsBanner'>
                <div className="backdrop-img">
                    <img src={backdrop + backdroppath} alt="" />
                </div>
                <div className='opacity-layer'>1</div>
                <ContentWrapper>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                            <div className='card' style={{ width: '331px' }}>
                                {posterpath ?
                                    (<img src={poster + posterpath} alt="poster" className='img-fluid' />)
                                    : (
                                        <img src={posterFallback} />
                                    )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 text-white">
                            <div className="title">
                                {responce.name || responce.title}({dayjs(responce?.release_date).format('YYYY')})
                            </div>
                            <div className='subtitle'>
                                {responce.tagline}
                            </div>
                            <Genres data={_genres} />
                            <div className='Watch d-flex  align-items-center'>
                                <CircleRating rating={responce?.vote_average?.toFixed(1)} />
                                <div className='playbtn ms-2' onClick={() => {
                                    setShow(true)
                                    setvideoId(video.key)
                                }}>
                                    <PlayIcon />
                                    <span className='text'>
                                        Watch Tailer
                                    </span>
                                </div>
                            </div>
                            <div className="overview">
                                <div className="heading">
                                    Overview
                                </div>
                                <div className="description">
                                    {responce.overview}
                                </div>
                            </div>
                            <div className='info'>
                                {
                                    responce?.status && (
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                status :{""}
                                            </span>
                                            <span className='text'>
                                                {responce.status}
                                            </span>
                                        </div>)}

                                {
                                    responce?.release_date && (
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                release_date :{""}
                                            </span>
                                            <span className='text'>
                                                {dayjs(responce.release_date).format("MMM D,YYYY")}
                                            </span>
                                        </div>)
                                }

                                {responce?.runtime && (
                                    <div className='infoItem'>
                                        <span className='text bold'>
                                            runtime :{""}
                                        </span>
                                        <span className='text'>
                                            {toHoursAndMinutes(responce.runtime)}
                                        </span>
                                    </div>)
                                }
                            </div>

                            {director?.length > 0 && (<div className='info'>
                                <div className='infoItem'>
                                    <span className='text bold'>
                                        Director :{""}
                                    </span>
                                    <span className='text'>
                                        {director?.map((item, i) => (
                                            <span key={i}>
                                                {item.name}
                                                {director.length - 1 !== i && ","}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </div>)}

                            {responce?.created_by?.length > 0 && (<div className='info'>
                                <div className='infoItem'>
                                    <span className='text bold'>
                                        Creator :{""}
                                    </span>
                                    <span className='text'>
                                        {responce?.created_by?.map((item, i) => (
                                            <span key={i}>
                                                {item.name}
                                                {responce?.created_by?.length - 1 !== i && ","}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </div>)}

                            {Writer?.length > 0 && (<div className='info'>
                                <div className='infoItem'>
                                    <span className='text bold'>
                                        Writer :{""}
                                    </span>
                                    <span className='text'>
                                        {Writer?.map((item, i) => (
                                            <span>
                                                {item.name}
                                                {Writer.length - 1 !== i ? " , " : " "}
                                                {/* {Writer.lenght - 1 !== i && " , " || Writer.lenght - 1 == i && ""} */}
                                            </span>

                                        ))}
                                    </span>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </ContentWrapper >
                <VideoPopup setShow={setShow} show={show} videoId={videoId} setVideoId={setvideoId} />
            </div >
        </>
    );
}

export default DetailsBanner;

// {responce?.genres.map((item, id) => {
//                                     return (genres[item.id].name)
//                                 })} 