import { combineReducers } from "redux";
import { postReducer } from "./postreducre";


const reducers = combineReducers({
    setPosts : postReducer,
})

export default reducers