import instance from "../Redux/apiCall";

export const GETAPI = async (url, params) => {
    try {
        const response = await instance.get(url, { params: params });
        return response.data
    } catch (err) {
        console.log(err)
        return err;
    }
}
