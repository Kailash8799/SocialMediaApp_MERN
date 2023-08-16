import { ActionType } from "../contants/action-type";

const initialState = {
  posts: [],
};

export const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionType.SET_POSTS:
        return { ...state, posts: payload };
      default:
        return state;
    }
  };
  