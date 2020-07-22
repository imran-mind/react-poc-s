import { authenticationService } from '../services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.decryptData();
    console.log('------authHeader---',currentUser)
    if (currentUser && currentUser.accessToken) {
        return { authorization: `Bearer ${currentUser.accessToken}` };
    } else {
        return {};
    }
}