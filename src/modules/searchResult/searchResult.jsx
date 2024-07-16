import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import noResult from '../../assets/no-results.png'
import ContentWrapper from '../../shared/contentWrapper/contentWrapper'
import *as Action from '../../Redux/searchPage/search_Action'
import './style.scss'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../shared/spinner/spinner'
import MovieCard from '../../shared/movieCard/MovieCard';

function SearchResult(props) {

    const [data, setdata] = useState(null)
    const [pageNum, setpageNum] = useState(1);
    const [loading, setLoading] = useState(false)
    const { query } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setpageNum(1)
        getSearchResult()
    }, [query])

    const getSearchResult = async () => {
        setLoading(true)
        const responce = await dispatch(Action.getSearchResult(`/search/multi?query=${query}&page=${pageNum}`))
        setdata(responce)
        // setpageNum((pev) => pev + 1)
        setLoading(false)
    }

    const getNextPageData = async () => {
        setLoading(true)
        const responce = await dispatch(Action.getNextPageData(`/search/multi?query=${query}&page=${pageNum}`))
        // console.log("search -", responce)
        if (data?.results) {
            setdata({ ...data, results: [...data?.results, ...responce.results] })
        }
        else {
            setdata(responce)
        }
        setpageNum((pre) => pre + 1)
        console.log("data -", data)
    }

    return (
        <>
            <div className='searchResultsPage mt-5' >
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <ContentWrapper>
                        {data?.results?.length > 0 ? (
                            <>
                                <div className="pageTitle">
                                    {
                                        `search ${data.total_results > 1 ? "results" : "result"} of 's ${query}`
                                    }
                                </div>
                                <InfiniteScroll
                                    className='content'
                                    dataLength={data?.results?.length || []}
                                    next={getNextPageData}
                                    hasMore={pageNum <= data?.total_page}
                                    loader={<Spinner />}
                                >
                                    {data.results.map((item, index) => {
                                        if (item.media_type === "person") return;
                                        return (
                                            <MovieCard key={index} data={item} fromSearch={true} />
                                        )
                                    })}
                                </InfiniteScroll>
                            </>
                        ) : (<span className='resultNotFound'>
                            Sorry , Results not found!
                        </span>)}
                    </ContentWrapper>
                )}
            </div>
        </>
    );
}

export default SearchResult;