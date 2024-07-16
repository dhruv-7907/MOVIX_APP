
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
// import InfiniteScroll from 'infinite-scroll-library';
import Select from "react-select";
import ContentWrapper from '../../shared/contentWrapper/contentWrapper'
import *as Action from '../../Redux/ExplorPage/explor_Action'
import Carousel from "../../shared/carousel/carousel";
import MovieCard from "../../shared/movieCard/movieCard";
import Spinner from "../../shared/spinner/spinner";
import { useDispatch } from "react-redux";
import "./style.scss";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {

    const [data, setdata] = useState(null);
    const [genresData, setgenresData] = useState(null)
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const dispatch = useDispatch()
    const { mediaType } = useParams();

    // const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
    const getlist = async () => {
        const responce = await dispatch(Action.getlist(`/genre/${mediaType}/list`))
        setgenresData(responce)
    }


    const getExplorResult = async () => {
        setLoading(true)
        const responce = await dispatch(Action.getExplorResult(`/discover/${mediaType}`, filters))
        setdata(responce)
        setLoading(false)
        setPageNum((pre) => pre + 1)
    }

    const getNextPageData = async () => {
        setLoading(true)
        const responce = await dispatch(Action.getNextPageData(`/discover/${mediaType}?page=${pageNum}`, filters))
        if (data?.results) {
            setdata({ ...data, results: [...data?.results, ...responce.results] })
        }
        else {
            setdata(responce)
        }
        setPageNum((pre) => pre + 1)
    }

    useEffect(() => {
        getlist()
        filters = {};
        setdata(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        getExplorResult();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            // setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        getExplorResult();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            // value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={getNextPageData}
                                hasMore={pageNum <= data?.total_page}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;