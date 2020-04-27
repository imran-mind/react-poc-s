import config from '../config';
import { authHeader, handleResponse } from '../helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    debugger
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}