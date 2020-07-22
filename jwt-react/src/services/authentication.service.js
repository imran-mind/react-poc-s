import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { handleResponse } from '../helpers';
import CryptoJS from 'crypto-js';


// const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

let jwt = null;
// Decrypt

export const decryptData = () => {
    const token = localStorage.getItem('currentUser');
    if (token) {
        var bytes = CryptoJS.AES.decrypt(token, 'my-secret-key@123');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData);
        return decryptedData;
    }
    return;
}
export const authenticationService = {
    login,
    encrytToken,
    logout,
    getJWTToken,
    callRefreshtoken,
    decryptData,
    // currentUser: currentUserSubject.asObservable(),
    // get currentUserValue () {
    //     return currentUserSubject.value
    // }
};

function getJWTToken() {
    return jwt;
}

function callRefreshtoken() {
    return fetch(`${config.apiUrl}/refresh_token`)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            jwt = user;
            // localStorage.setItem('currentUser', JSON.stringify(user));
            // currentUserSubject.next(user);
            return user;
        });
}
// const config = {
//     apiUrl: 'http://localhost:5000/api/v1/'
// }

/* Storing ecrypted access_token and user info in localstorage */
function encrytToken(user) {
    var encrytedToken = CryptoJS.AES.encrypt(JSON.stringify(user), 'my-secret-key@123').toString();
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', encrytedToken);
}

/* Making Login Api call */
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // mode: 'cors',
        // credentials: 'same-origin',
        // credentials: 'include' ,
        // withCredentials: true,
        body: JSON.stringify({ username, password })
    };
    console.log('--> config ', config);
    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // jwt = user;
            // var encrytedToken = CryptoJS.AES.encrypt(JSON.stringify(user), 'my-secret-key@123').toString();
            // localStorage.setItem('currentUser', encrytedToken);
            encrytToken(user);
            // currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // currentUserSubject.next(null);
    // jwt = null;
}
