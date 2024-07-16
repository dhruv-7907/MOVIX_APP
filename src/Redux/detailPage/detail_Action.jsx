import *as detailCrud from './detail_Crud'

export const getDetails = (params) => async (dispatch) => {
    const responce = await detailCrud.getDetails(params)
    return responce
}

export const getReletedVideo = (params) => async (dispatch) => {
    const responce = await detailCrud.getReletedVideo(params)
    return responce
}

export const getCredits = (params) => async (dispatch) => {
    const responce = await detailCrud.getCredits(params)
    return responce
}

export const getSimilarShow = (params) => async (dispatch) => {
    const responce = await detailCrud.getSimilarShow(params)
    return responce
}

export const getRecommondationShow = (params) => async (dispatch) => {
    const responce = await detailCrud.getRecommondationShow(params)
    return responce
}


