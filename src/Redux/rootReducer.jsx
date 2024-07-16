import { combineReducers } from "redux";
import { homeSlice } from "./homePage/home_Slice";
const rootReducer = combineReducers({
    homepage: homeSlice.reducer
});

export default rootReducer;