import axios from 'axios'

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api/',
// });

const URL = 'http://localhost:5000/api'

// export const signup = (data) => api.post('/signup', data);
// export const login = (data) => api.post('/login', data);

export const signup = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(URL + '/users/signup', data);
        return response.data
    } catch (e) {
        return { error: e.code, errorMessage: e.message };
    }
};

export const login = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(URL + '/users/login', data);
        return response.data
    } catch (e) {
        return { error: e.code, errorMessage: e.message };
    }
};

export const getAllPeeps = async () => {
    try {
        const response = await axios.get(URL + '/peeps');
        return response.data;
    } catch (error) {
        return { error: error.code, errorMessage: error.message };
    }
};