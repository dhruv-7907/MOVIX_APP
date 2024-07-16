import { HOME } from "../../constants/variables";
import { GETAPI } from "../../shared/apiHandler";
import instance from "../apiCall";

export const fetchApiConfiguration = () => {
    return GETAPI(HOME.CONFIGURATION)
}

export const upComingMovie = () => {
    return GETAPI(HOME.MOVIE + HOME.UPCOMING)
}

export const trendingShow = (params) => {
    return GETAPI(HOME.TRENDING + HOME.ALL + `/${params}`)
}
export const popularShow = (params) => {
    return GETAPI(`${params}` + HOME.POPULAR)
}

export const genreList = (params) => {
    return GETAPI(HOME.GENRE + `/${params}`)
}