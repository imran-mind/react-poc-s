import config from '../config';
import { authHeader, handleResponse } from '../helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    const url = `${config.apiUrl}/users`;
    return fetch(url, requestOptions).then(handleResponse);
}