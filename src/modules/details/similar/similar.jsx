import React from 'react';
import Carousel from '../../../shared/carousel/carousel'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import *as Action from '../../../Redux/detailPage/detail_Action';
import { useState } from 'react';
import ContentWrapper from '../../../shared/contentWrapper/contentWrapper';
function Similar({ mediaType, Id }) {
    const [responce, setreponce] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        getSimilarShow()
    }, [mediaType, Id])
    const getSimilarShow = async () => {
        const responce = await dispatch(Action.getSimilarShow(`/${mediaType}/${Id}`))
        setreponce(responce)
    }

    const title = mediaType === "tv" ? "Similar Tv Show" : "Similar movie Show"
    return (
        <>
            <ContentWrapper>
                {
                    responce?.results?.length !== 0 && (
                        <div className='mb-5'>

                            <div className='main_title'>
                                {title}
                            </div>
                            <Carousel
                                title={title}
                                data={responce}
                                endpoint={mediaType}
                            />

                        </div>
                    )
                }
            </ContentWrapper>
        </>
    );
}


export default Similar;

