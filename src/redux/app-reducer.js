import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS: {
            return {
               ...state,
               initialized: true
            }
        }
        default:
            return state;
    }
}

const initializeSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return (dispatch) => {
        dispatch(getAuthUserData()).then( () => {dispatch(initializeSuccess())} )
    }
}

export default appReducer;