import * as axios from 'axios';

const BASE_URL = 'http://localhost:8080/server/public/api/';

const instance = axios.create({
    headers: {
        withCredentials: true
    },
    baseURL: BASE_URL
})

export const MeAPI = {
    authMe(token) {
        return instance.get('auth/me', {headers: {'Authorization': `Bearer ${token}`}}).then(response => response.data)
    },
    login(data) {
        return instance.post('login', data).then(response => response.data)
    },
    logout(token) {
        return instance.delete('login', {headers: {'Authorization': `Bearer ${token}`}}).then(response=> response.data)
    },
    register(data) {
        return instance.post('register', data).then(response => response.data)
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    updateStatus (text, token) {
        return instance.put('profile/status', {status: text}, {headers: {'Authorization': `Bearer ${token}`}})
    }
}

export const UsersAPI = {
    getUsers(token, pageSize, currentPage, search) {
        return instance.get(`users?limit=${pageSize}&page=${currentPage}&search=${search}`, 
            {headers: {'Authorization': `Bearer ${token}`}}).then(response=> response.data)
    },
    follow(token, userId) {
        return instance.post(`follow/${userId}`, {}, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => response.data)
    },
    unfollow(token, userId) {
        return instance.delete(`follow/${userId}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => response.data)
    }
}

