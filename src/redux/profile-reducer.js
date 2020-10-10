import { ProfileAPI } from "../api/api";

const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const UPDATE_PHOTOS = 'UPDATE-PHOTOS';
const TOGGLE_IN_PROGRESS = 'TOGGLE_IN_PROGRESS';
const TOGGLE_EDIT_PHOTO_MODE = 'TOGGLE_EDIT_PHOTO_MODE';

let initialState = {
    profile: null,
    status: '',
    inProgress: false,
    editPhotoMode: false,
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
        case UPDATE_PHOTOS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case TOGGLE_IN_PROGRESS:
            return {
                ...state, 
                inProgress: action.inProgress
            }
        case TOGGLE_EDIT_PHOTO_MODE: {
            return {
                ...state,
                editPhotoMode: action.editPhotoMode
            }
        }
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status});
export const updatePhotoSuccess = (photos) => ({type: UPDATE_PHOTOS, photos});
export const toggleInProgress = (inProgress) => ({type: TOGGLE_IN_PROGRESS, inProgress});
export const toggleEditPhotoMode = (editPhotoMode) => ({type: TOGGLE_EDIT_PHOTO_MODE, editPhotoMode});

export const getProfile = (userId) => {
    return async (dispatch) => {
        let data = await ProfileAPI.getProfile(userId);
        if(data.resultCode === 0) 
            dispatch(setUserProfile(data.data))
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        ProfileAPI.updateStatus(status).then(response => {
            if(response.data.resultCode === 0)
                dispatch(setStatus(status))
        })
    }
}
export const changePhotoFlow = async (dispatch, apiMethod, photoFile = null) => {
    dispatch(toggleInProgress(true));
    let response = await apiMethod(photoFile);
    if (response.data.resultCode === 0) 
        dispatch(updatePhotoSuccess(response.data.data));
    
    dispatch(toggleEditPhotoMode(false));
    dispatch(toggleInProgress(false));
}

export const updatePhoto = (photoFile) => {
    return async (dispatch) => {
        changePhotoFlow(dispatch, ProfileAPI.updatePhoto.bind(ProfileAPI), photoFile);
    }
}

export const deletePhoto = () => {
    return async (dispatch) => {
        changePhotoFlow(dispatch, ProfileAPI.deletePhoto.bind(ProfileAPI));
    }
}

export default profileReducer;