import { authenticationService } from '../services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    debugger
    if (currentUser && currentUser.token) {
        return { authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}