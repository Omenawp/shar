import { UsersAPI } from "../api/api";

const storageName = 'userData';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_PAGES = 'SET-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS';
const CLEAR = 'CLEAR';
const UPDATE_SERCH_TEXT = 'UPDATE-SERCH-TEXT';

let initialState = {
    users: [],
    pageSize: 3,
    currentPage: 1,
    maxPage: 0,
    isFetching: false,
    followingProgress: [],
    searchText: ''
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId)
                        return {...u, followed: true}
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId)
                        return {...u, followed: false}
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users,...action.users]
            }
        case SET_PAGES:
            return {
                ...state,
                currentPage: action.pageNumber,
                maxPage: action.maxPage
            }
        case TOGGLE_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS: 
            return {
                ...state,
                followingProgress: action.isFetching
                ? [...state.followingProgress, action.userId]
                : state.followingProgress.filter(id => id !== action.userId)
            }
        case CLEAR:
            return {
                ...state,
                users: [],
                currentPage: 1,
                maxPage: 0,
                isFetching: false,
                followingProgress: []
            }
        case UPDATE_SERCH_TEXT:
            return {
                ...state,
                searchText: action.text
            }
        default:
            return state;
    }
}

export const followAccept = (userId) => ({type: FOLLOW, userId});
export const unfollowAccept = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setPages = (pageNumber, maxPage) => ({type: SET_PAGES, pageNumber, maxPage});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});
export const clearState = () => ({type: CLEAR});
export const updateSearchText = (text) => ({type: UPDATE_SERCH_TEXT, text})

export const recieveUsers = (pageSize, currentPage, searchText) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        const data = JSON.parse(localStorage.getItem(storageName));
        let token = (data != null) ? data.token : '';

        UsersAPI.getUsers(token, pageSize, currentPage, searchText).then(data => {
            if(data.items.length !== 0) {
                let maxPage = Math.ceil(data.count/pageSize);
                dispatch(setPages(currentPage, maxPage));
                dispatch(setUsers(data.items));
            }
            dispatch(toggleIsFetching(false));
        })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        const data = JSON.parse(localStorage.getItem(storageName));
        let token = (data != null) ? data.token : '';

        UsersAPI.follow(token, userId).then(data => {
            if(data.resultCode === 0) {
                dispatch(toggleFollowingProgress(false, userId));
                dispatch(followAccept(userId));
            }
        })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        const data = JSON.parse(localStorage.getItem(storageName));
        let token = (data != null) ? data.token : '';

        UsersAPI.unfollow(token, userId).then(data => {
            if(data.resultCode === 0) {
                dispatch(toggleFollowingProgress(false, userId));
                dispatch(unfollowAccept(userId));
            }
        })
    }
}


export default usersReducer;