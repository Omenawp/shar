import { ProfileAPI } from "../api/api";

const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const storageName = 'userData'

let initialState = {
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                profile: {...state.profile, status: action.status}
            }
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getProfile = (userId) => {
    return(dispatch) => {
        ProfileAPI.getProfile(userId).then(data => {
            if(data.resultCode === 0)
                dispatch(setUserProfile(data.data))
        })
    }
}

export const updateStatus = (status) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    const token = data.token || '';

    return (dispatch) => {
        ProfileAPI.updateStatus(status, token).then(response => {
            if(response.data.resultCode === 0)
                dispatch(setStatus(status))
        })
    }
}

export default profileReducer;