import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store;