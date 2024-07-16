import { GETAPI } from "../../shared/apiHandler";

export const getlist = (params) => {
    return GETAPI(params)
}
export const getExplorResult = (url, params) => {
    // console.log("mit -", params)
    return GETAPI(url, params);
}

export const getNextPageData = (params) => {
    return GETAPI(params);
}