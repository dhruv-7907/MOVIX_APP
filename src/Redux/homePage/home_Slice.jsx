import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
        getApiConfigration: (state, action) => {
            state.url = action.payload
        },
        getgenres: (state, action) => {
            state.genres = action.payload
        }
    }
})
export const { getApiConfigration, getgenres } = homeSlice.actions