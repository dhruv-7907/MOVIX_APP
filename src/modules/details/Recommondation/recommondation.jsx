import React from 'react';
import Carousel from '../../../shared/carousel/carousel'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import *as Action from '../../../Redux/detailPage/detail_Action';
import { useState } from 'react';
import ContentWrapper from '../../../shared/contentWrapper/contentWrapper';
function Recommondation({ mediaType, Id }) {
    const [responce, setreponce] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        getRecommondationShow()
    }, [mediaType, Id])
    const getRecommondationShow = async () => {
        const responce = await dispatch(Action.getRecommondationShow(`/${mediaType}/${Id}`))
        setreponce(responce)
    }

    const title = "Recommondation"

    return (
        <>
            <ContentWrapper>
                {
                    responce?.results?.length !== 0 && (
                        <>
                            <div className='main_title'>
                                {title}
                            </div>
                            <div className=' detail_Carousel'>
                                <Carousel
                                    title={title}
                                    data={responce}
                                    endpoint={mediaType}
                                />
                            </div>
                        </>
                    )
                }
            </ContentWrapper>
        </>
    );
}

export default Recommondation;