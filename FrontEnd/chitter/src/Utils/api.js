import axios from 'axios'

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api/',
// });

const URL = 'http://localhost:5000/api/users/'

// export const signup = (data) => api.post('/signup', data);
// export const login = (data) => api.post('/login', data);

export const signup = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(URL + 'signup', data);
        return response.data
    } catch (e) {
        return { error: e.code, errorMessage: e.message };
    }
};

export const login = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(URL + 'login', data);
        return response.data
    } catch (e) {
        return { error: e.code, errorMessage: e.message };
    }
};