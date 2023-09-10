import { ActionType } from "../contants/action-type";

const initialState = {
  posts: [],
};

const currentUser = {}

export const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionType.SET_POSTS:
        return { ...state, posts: payload };
      default:
        return state;
    }
};
  
export const currentUserReducer = (state = currentUser, { type, payload }) => {
  
    switch (type) {
      case ActionType.SET_USER:
        return { ...payload };
      default:
        return state;
    }
};
  