import React from 'react';
import './style.scss'
import { useSelector } from 'react-redux';

function Genres({ data }) {
    // console.log("data :-", data)
    const { genres } = useSelector((state) => (state.homepage))
    return (
        <div className='genres mb-1'>
            {
                data?.map((item, id) => {
                    // console.log("item", item)
                    return <div className='genre' key={id}>
                        {genres[item]?.name}
                    </div>
                })
            }
        </div>
    );
}

export default Genres;