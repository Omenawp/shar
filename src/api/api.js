import * as axios from 'axios';

const BASE_URL = 'http://localhost:8080/server/public/api/';
const storageName = 'userData';

const instance = axios.create({
    headers: {
        withCredentials: true
    },
    baseURL: BASE_URL
})

const getToken = () =>{
    const data = JSON.parse(localStorage.getItem(storageName));
    let token = (data !== null) ? data.token : '';
    return token;
}

export const MeAPI = {
    authMe() {
        return instance.get('auth/me', {headers: {'Authorization': `Bearer ${getToken()}`}})
            .then(response => response.data)
    },
    login(data) {
        return instance.post('login', data).then(response => response.data)
    },
    logout() {
        return instance.delete('login', {headers: {'Authorization': `Bearer ${getToken()}`}})
            .then(response=> response.data)
    },
    register(data) {
        return instance.post('register', data).then(response => response.data)
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    updateStatus (text) {
        return instance.put('profile/status', {status: text}, {headers: {'Authorization': `Bearer ${getToken()}`}})
    }
}

export const UsersAPI = {
    getUsers(pageSize, currentPage, search) {
        return instance.get(`users?limit=${pageSize}&page=${currentPage}&search=${search}`, 
            {headers: {'Authorization': `Bearer ${getToken()}`}}).then(response=> response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {}, {headers: {'Authorization': `Bearer ${getToken()}`}})
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`, {headers: {'Authorization': `Bearer ${getToken()}`}})
            .then(response => response.data)
    }
}

