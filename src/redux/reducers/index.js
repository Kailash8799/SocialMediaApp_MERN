import { combineReducers } from "redux";
import { currentUserReducer, postReducer } from "./postreducre";


const reducers = combineReducers({
    setPosts : postReducer,
    setUser : currentUserReducer
})

export default reducers