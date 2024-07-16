import *as explorCrud from './explor_Crud'

export const getlist = (params) => async (dispatch) => {
    const responce = await explorCrud.getlist(params)
    return responce
}

export const getExplorResult = (url, params) => async (dispatch) => {
    const responce = await explorCrud.getExplorResult(url, params)
    return responce
}
export const getNextPageData = (params) => async (dispatch) => {
    const responce = await explorCrud.getNextPageData(params)
    return responce
}