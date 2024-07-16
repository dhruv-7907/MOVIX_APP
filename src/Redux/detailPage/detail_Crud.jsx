import { GETAPI } from "../../shared/apiHandler";

export const getDetails = (params) => {
    return GETAPI(params);
}

export const getReletedVideo = (params) => {
    return GETAPI(params);
}

export const getCredits = (params) => {
    return GETAPI(params);
}

export const getSimilarShow = (params) => {
    return GETAPI(`${params}/similar`)
}

export const getRecommondationShow = (params) => {
    return GETAPI(`${params}/recommendations`)
}


