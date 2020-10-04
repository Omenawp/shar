import { PostsAPI } from "../api/api";

const PRELOAD_IMAGE = 'PRELOAD_IMAGE';
const POST_TEXT = 'POST_TEXT';


let initialState = {
    posts: [],
    preimageURL: null,
    postText: '',
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRELOAD_IMAGE:
            return {
                ...state, 
                preimageURL: action.preimageURL
            }
        case POST_TEXT:
            return {
                ...state, 
                postText: action.postText
            }
        default: 
            return state;
    }
}

export const putImage = (preimageURL) => ({type: PRELOAD_IMAGE, preimageURL});
export const changePostText = (postText) => ({type: POST_TEXT, postText});

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

export const addPost = () => {
    return async (dispatch, getState) =>  {
        let response = await PostsAPI.add(getState().posts.postText, getState().posts.preimageURL, []);
        if(response.data.resultCode === 0)
            dispatch(putImage(response.data.url))
    }
}

export default postsReducer;