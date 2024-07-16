import *as homecrud from "./home_Crud";
import *as homeSlice from "./home_Slice";

export const fetchApiConfiguration = () => async (dispatch) => {
    try {
        const response = await homecrud.fetchApiConfiguration();

        if (response) {
            const url = {
                backdrop: response.images.secure_base_url + "original",
                poster: response.images.secure_base_url + "original",
                profile: response.images.secure_base_url + "original"
            }
            dispatch(homeSlice.getApiConfigration(url))
        }
        return response;
    } catch (err) {
        throw err;
    }
};

export const upComingMovie = () => async (dispatch) => {
    try {
        const responce = await homecrud.upComingMovie();
        return responce;
    } catch (err) {
        throw err;
    }
}

export const trendingShow = (params) => async (dispatch) => {
    try {
        const responce = await homecrud.trendingShow(params)
        return responce;
    } catch (err) {
        throw err
    }
}

export const popularShow = (params) => async (dispatch) => {
    try {
        const responce = await homecrud.popularShow(params)
        return responce
    } catch (err) {
        throw err
    }

}

export const genreList = (params) => async (dispatch) => {
    try {
        let promises = []
        let gernesAll = {}
        params.forEach(params => {
            promises.push(homecrud.genreList(params))
        });
        const data = await Promise.all(promises)
        data.map(({ genres }) => {
            return genres.map((item) => (
                gernesAll[item.id] = item
            ))
        })
        dispatch(homeSlice.getgenres(gernesAll))
        // console.log("gernesAll :", gernesAll)
    } catch (err) {
        throw err
    }

}