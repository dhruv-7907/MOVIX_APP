import React, { useRef, useState } from 'react';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Genres from '../genres/genres';
// import Img from '../lazyLoadImage/img'
import PosterFallback from '../../assets/no-poster.png'
import ContentWrapper from '../contentWrapper/contentWrapper';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import CircleRating from '../circleRating/circleRating';
import './style.scss'
import { useNavigate } from 'react-router-dom';

function Carousel({ data, endpoint }) {

    // console.log("data -", data)

    const [cardWidth, setcardWidth] = useState("cardWidth")
    const carouselRef = useRef(null);
    const url = useSelector((state) => (state.homepage.url))
    const navigate = useNavigate()

    const scrollLeft = () => {
        if (carouselRef.current) {
            const width = carouselRef.current.clientWidth;
            carouselRef.current.scrollLeft -= width;
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const width = carouselRef.current.clientWidth;
            carouselRef.current.scrollLeft += width;
        }
    };

    return (
        <>
            {/* < ContentWrapper> */}
            <div className='position-relative'>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={scrollLeft}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={scrollRight}
                />
                <div className='carousel text-white' ref={carouselRef} style={{ overflowX: 'auto', paddingLeft: "10px" }}>
                    <div className='carouselItem' style={{ display: 'inline-flex' }}>

                        {
                            data?.results.map((Item, index) => {
                                const rating = Item.vote_average?.toFixed(1)
                                const posterUrl = Item?.poster_path ? (url.poster + Item.poster_path) : (PosterFallback)

                                return <div className={`card position-relative me-3 ${cardWidth}`} key={index} >
                                    <div className="card-img-top">
                                        <img src={posterUrl} alt="..." className='img-fluid' style={{ maxHeight: '200px', maxWidth: 'auto' }} onClick={() => navigate(`/${Item.media_type || endpoint}/${Item.id}`)} />
                                    </div>
                                    <CircleRating rating={rating} />
                                    <div className="textBlock">
                                        <Genres data={Item.genre_ids} />
                                        <span className='title'>
                                            {Item.title || Item.name}
                                        </span>
                                        <span className='date'>
                                            {
                                                dayjs(
                                                    Item.release_date
                                                ).format("MMM D,YYYY")
                                            }
                                        </span>
                                    </div>
                                </div>
                            })

                        }
                    </div>
                </div >
            </div>
            {/* </ContentWrapper > */}
        </>
    );
}

export default Carousel;

// {
//     data?.results.map((Item, index) => {
//         const posterUrl = url.poster + Item.poster_path
//         return <div
//             key={index}
//             className="col-lg-2 col-md-3  gap bg-dark p-1 card"
//         >
//             <img src={posterUrl} alt="" />
//         </div>
//     })
// }

{/* <BsFillArrowLeftCircleFill
                            className="carouselLeftNav arrow"
                            onClick={scrollLeft}
                        />
                        <BsFillArrowRightCircleFill
                            className="carouselRighttNav arrow"
                            onClick={scrollRight}
                        /> */}


//     array.map(() => {
//         return <div className="card position-relative" style={{ width: '18rem' }}>
//     <img src="." className="card-img-top" alt="..." />
//     {/* <div className="card-body">
//                 <h5 className="card-title">Card title</h5>
//                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                 <a href="#" className="btn btn-primary">Go somewhere</a>
//             </div> */}
// </div>
//     })

// let box = document.querySelector('.carousel')
// console.log(box)
// const btnpressprv = () => {
//     let width = box.clientWidth;
//     console.log("width :-", width)
//     box.scrollLeft = box.scrollLeft - width
// }
// const btnpressnext = () => {
//     let width = box.clientWidth;
//     console.log("width :-", width)
//     box.scrollLeft = box.scrollLeft + width
// }