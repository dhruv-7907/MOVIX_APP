import *as searchcrud from './search_Crud'

export const getSearchResult = (params) => async (dispatch) => {
    const responce = await searchcrud.getSearchResult(params)
    return responce
}
export const getNextPageData = (params) => async (dispatch) => {
    const responce = await searchcrud.getNextPageData(params)
    return responce
}


