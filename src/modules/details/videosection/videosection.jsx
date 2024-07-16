import React, { useState } from "react";

import "./style.scss";
import ContentWrapper from "../../../shared/contentWrapper/contentWrapper";
import { PlayIcon } from "../../../shared/playbtn/playbtn";
import VideoPopup from "../../../shared/videoPopup/videoPopup";
import img from '../../../shared/lazyLoadImage/img'

const VideosSection = ({ data }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    return (
        <>
            {data?.results?.length > 0 && (
                <div className="videosSection">
                    <ContentWrapper><div className="sectionHeading">Official Videos</div></ContentWrapper>
                    <ContentWrapper>

                        <div className="videos">
                            {
                                data?.results?.map((item) => {
                                    return <div className="videoItem"
                                        key={item.id}
                                        onClick={() => {
                                            setVideoId(item.key)
                                            setShow(true)
                                        }}>
                                        <div className="videoThumbnail">
                                            <img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                                            <PlayIcon />
                                        </div>
                                        <div className="videoTitle">
                                            {item.name}
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                    </ContentWrapper>
                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                    />
                </div>
            )}
        </>
    );
};

export default VideosSection;