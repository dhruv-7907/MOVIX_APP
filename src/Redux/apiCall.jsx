import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.request.use(
    (config) => {
        // const accessToken = getCookie(token);
        // console.log("accessToken", accessToken)
        // if (accessToken) {
        config.headers["Authorization"] = `Bearer ${TMDB_TOKEN}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;

// const headers = {
//     Authorization: "bearer " + TMDB_TOKEN,
// }

// export const fetchDataFromApi = async (url, params) => {
//     try {
//         const { data } = await axios.get(BASE_URL + url, {
//             headers,
//             params
//         })
//         return data;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// }