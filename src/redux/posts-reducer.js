import { PostsAPI } from "../api/api";

const PRELOAD_IMAGE = 'PRELOAD_IMAGE';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POSTS = 'UPDATE_POSTS';
const TOGGLE_NEW_POSTS_MODE = 'TOGGLE_NEW_POSTS_MODE';
const TOGGLE_IN_PROGRESS = 'TOGGLE_IN_PROGRESS';
const LIKE_DISLIKE_ACCEPT = 'LIKE_DISLIKE_ACCEPT';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/FOLLOWING-IN-PROGRESS';
const SET_PAGES = 'posts/SET-PAGE';
const RESET_STATE = 'posts/RESET_STATE';

let initialState = {
    posts: [],
    preimageURL: null,
    inProgress: false,
    newPostMode: false,
    followingInProgress: [],
    pageSize: 3,
    currentPage: 1,
    maxPage: 0,
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGES:
            return {
                ...state,
                currentPage: action.pageNumber,
                maxPage: action.maxPage
            }
        case PRELOAD_IMAGE:
            return {
                ...state, 
                preimageURL: action.preimageURL
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(id => id !== action.post_id)
            }
        case UPDATE_POSTS:
            return {
                ...state,
                posts: [...state.posts,...action.posts]
            }
        case TOGGLE_NEW_POSTS_MODE:
            return {
                ...state, 
                newPostMode: action.newPostMode
            }
        case TOGGLE_IN_PROGRESS:
            return {
                ...state, 
                inProgress: action.inProgress
            }
        case LIKE_DISLIKE_ACCEPT:
            return {
                ...state,
                posts: state.posts.map(p => {
                    let count = action.bool? p.likes++ : p.likes--; 
                    if(p.id === action.id)
                        return {...p, like: action.bool}
                    return {...p, likes: count}
                })
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        case RESET_STATE:
            return initialState;
        default: 
            return state;
    }
}

export const putImage = (preimageURL) => ({type: PRELOAD_IMAGE, preimageURL});
export const updatePosts = (posts) => ({type: UPDATE_POSTS, posts});
export const deletePostAC = (post_id) => ({type: DELETE_POST, post_id});
export const toggleNewPostMode = (newPostMode) => ({type: TOGGLE_NEW_POSTS_MODE, newPostMode})
export const toggleInProgress = (inProgress) => ({type: TOGGLE_IN_PROGRESS, inProgress});
export const toggleFollowingProgress = (isFetching, id) => ({ 
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id });

export const likeDislikeAccept = (id, bool) => ({type:LIKE_DISLIKE_ACCEPT, id, bool });
export const setPages = (pageNumber, maxPage) => ({type: SET_PAGES, pageNumber, maxPage});
export const resetState = () => ({type: RESET_STATE});

export const clearImage = () => {
    return async (dispatch, getState) => {
        const url = getState().posts.preimageURL;
        let response = await PostsAPI.clear(url);
        if(response.data.resultCode === 0) 
            dispatch(putImage(null))  
        }
}

export const preloadImage = (file) => {
    return async (dispatch) =>  {    
        let response = await PostsAPI.preload(file);
        if(response.data.resultCode === 0)
            dispatch(putImage(response.data.url))
    }
}

export const getAllPosts = (id, currentPage) => {
    return async (dispatch, getState) => {
        let pageSize = getState().posts.pageSize;
        let response = await PostsAPI.allPosts(id, pageSize, currentPage);
        if(response.data.resultCode === 0){
            let pageSize = getState().posts.pageSize;
            let maxPage = Math.ceil(response.data.count/pageSize);
            dispatch(setPages(currentPage, maxPage))
            dispatch(updatePosts(response.data.data));
        }
    }
}

export const addPost = (text) => {
    return async (dispatch, getState) =>  {
        dispatch(toggleInProgress(true))
        let response = await PostsAPI.add(text, getState().posts.preimageURL);
        if(response.data.resultCode === 0) {
            let id = getState().auth.userId;
            dispatch(clearImage())
            dispatch(getAllPosts(id));
            dispatch(toggleInProgress(false));
            dispatch(toggleNewPostMode(false));
        }
    }
}

export const deletePost = (id_post) => {
    return async (dispatch) => {
        let response = await PostsAPI.delete(id_post);
        if(response.data.resultCode === 0)
            dispatch(deletePostAC(id_post));
    }
}

export const likeDislikeFlow = async (dispatch, id_post, apiMethod, bool) => {
    dispatch(toggleFollowingProgress(true, id_post ));

    let response = await apiMethod(id_post); 
    if(response.data.resultCode === 0) {
        dispatch(likeDislikeAccept(id_post, bool));
    }

    dispatch(toggleFollowingProgress(false, id_post ));
}

export const likePost = (id_post) => {
    return async (dispatch) => {
        likeDislikeFlow(dispatch, id_post, PostsAPI.like.bind(PostsAPI), true);
    }
}

export const dislikePost = (id_post) => {
    return async (dispatch) => {
        likeDislikeFlow(dispatch, id_post, PostsAPI.dislike.bind(PostsAPI), false);
    }
}

export default postsReducer;