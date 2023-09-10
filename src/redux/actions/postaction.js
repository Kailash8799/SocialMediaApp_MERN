import { ActionType } from "../contants/action-type";

export const setPosts = (posts)=>{
    return {
        type:ActionType.SET_POSTS,
        payload:posts
    }
}

export const setUser = (user)=>{
    return {
        type:ActionType.SET_USER,
        payload:user
    }
}

export const removePosts = ()=>{
    return {
        type:ActionType.REMOVE_POSTS
    }
}
export const setVideos = (videos)=>{
    return {
        type:ActionType.SET_VIDEOS,
        payload:videos
    }
}

export const removeVideos = ()=>{
    return {
        type:ActionType.REMOVE_VIDEOS
    }
}
export const setTweets = (tweets)=>{
    return {
        type:ActionType.SET_TWEETS,
        payload:tweets
    }
}

export const removeTweets = ()=>{
    return {
        type:ActionType.REMOVE_TWEETS
    }
}
