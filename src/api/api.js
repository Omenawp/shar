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
    },
    updatePhoto (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);

        return instance.post('profile/photo', formData, {headers: {
            'Authorization': `Bearer ${getToken()}`, 'Content-type': 'multipart/form-data'}})
    },
    deletePhoto () {
        return instance.delete('profile/photo', {headers: {'Authorization': `Bearer ${getToken()}`}})
    }
}

export const UsersAPI = {
    getUsers(pageSize, currentPage, search) {
        return instance.get(`users?limit=${pageSize}&page=${currentPage}&search=${search}`, 
            {headers: {'Authorization': `Bearer ${getToken()}`}}).then(response=> response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`,'', {headers: {'Authorization': `Bearer ${getToken()}`}})
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`, {headers: {'Authorization': `Bearer ${getToken()}`}})
            .then(response => response.data)
    }
}

export const PostsAPI = {
    preload(file) {
        const formData = new FormData();
        formData.append('pic', file);

        return instance.post('post/preload', formData, {headers: {'Authorization': `Bearer ${getToken()}`}});
    },
    clear(url) {
        return instance.post('post/clear', {url}, {headers: {'Authorization': `Bearer ${getToken()}`}});
    },
    add(text, url) {
        return instance.post('post/add', {text, url}, {headers: {'Authorization': `Bearer ${getToken()}`}});
    },
    delete(id_post) {
        return instance.delete(`post/${id_post}`, {headers: {'Authorization': `Bearer ${getToken()}`}});
    },
    like(id_post) {
        return instance.post(`like/${id_post}`, {} ,{headers: {'Authorization': `Bearer ${getToken()}`}});
    },
    dislike(id_post) {
        return instance.delete(`like/${id_post}`, {headers: {'Authorization': `Bearer ${getToken()}`}});
    },
    allPosts(id_post, pageSize, currentPage) {
        return instance.get(`posts?id_post=${id_post}&limit=${pageSize}&page=${currentPage} `, 
            {headers: {'Authorization': `Bearer ${getToken()}`}});
    }
}

