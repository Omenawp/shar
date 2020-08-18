import { MeAPI } from '../api/api';
import { stopSubmit, startSubmit } from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';
const storageName = 'userData';

let initialState = {
    userId: null,
    email: null,
    name: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, name, isAuth) => ({
    type: SET_USER_DATA, data: {userId, email, name, isAuth}
});

export const getAuthUserData = () => {
    return (dispatch) => {
        return MeAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                let { id, email, name } = data.data;
                dispatch(setAuthUserData(id, email, name, true));
            }
            else {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
    }
}

export const login = (obj) => {
    return (dispatch) => {
        dispatch(startSubmit("login"));
        MeAPI.login(obj).then(data => {
            if(data.resultCode === 0) {
                localStorage.setItem(storageName, JSON.stringify({token: data.token}));
                dispatch(getAuthUserData());
            }
            else {
                let error = data.message || 'Unknown error'
                dispatch(stopSubmit("login", {_error: error}))
            } 
        })
    }
}

export const register = (obj) => {
    return (dispatch) => {
        dispatch(startSubmit("signup"));

        MeAPI.register(obj).then(data => {
            if(data.resultCode === 0) {
                dispatch(stopSubmit("signup", {_error: '0'}))
            }
            else {
                let error = data.message || 'Unknown error'
                dispatch(stopSubmit("signup", {_error: error}))
            } 
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        MeAPI.logout().then( data => {
            if(data.resultCode === 0 ) {
                localStorage.removeItem(storageName);
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer;