import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form';
import profileReducer from "./profile-reducer";
import appReducer from "./app-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    usersPage: usersReducer,
    form: formReducer,
    profilePage: profileReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store;