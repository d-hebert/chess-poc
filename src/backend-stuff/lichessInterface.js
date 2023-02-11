// nicer to write up a client interface on the backend
import axios from 'axios';

const TOKEN = 'lip_l9quhFHzyjQ5KujqGb5z';
const API_URL = 'https://lichess.org/api';
const ROUTES = {
    GET_PLAYER: '/user/',
    GET_STATUS: '/users/status',
};
const AUTH_HEADER = {
    Authorization: 'Bearer ' + TOKEN,
};

export const getPlayer = async (username) => {
    const url = `${API_URL + ROUTES.GET_PLAYER + username}`;

    const request = {
        headers: { ...AUTH_HEADER },
        method: 'get',
        url,
    };

    return axios(request)
        .then(res => res?.data)
        .catch(err => err);
};

export const getStatus = async (id) => {
    const url = `${API_URL + ROUTES.GET_STATUS}`;

    const request = {
        headers: { ...AUTH_HEADER },
        method: 'get',
        params: {
            ids: id
        },
        url,
    };

    return axios(request)
        .then(res => res?.data?.[0])
        .catch(err => err);
};
