import { authenticationService } from '../services';
import config from '../config';
import { authHeader } from './auth-header';
// import authenticationService from '../services/authentication.service';
async function callRefreshtoken() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // mode: 'cors',
        // credentials: 'same-origin',
        // credentials: 'include'
        // withCredentials: true
    };
    return fetch(`${config.apiUrl}/refresh_token`, requestOptions)
        .then(response => response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    authenticationService.logout();
                    // window.location.reload(true);
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            authenticationService.encrytToken(data);
            return data;
        }))
}


export async function handleResponse(response) {
    return response.text().then(async (text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const failedAPIURL = response.url;
            /* Here Main refresh token logic is happening, whenever any subsequent api gives 401,
            It will caught here and from here we making a refresh token api call and getting access_token
            and updating the access_token in the localstorage(encrypted).
            And again calling failed API.
             */
            if (response.status === 401) {
                const refreshTokenResponse = await callRefreshtoken();
                const requestOptions = { method: 'GET', headers: authHeader() };
                const result = await fetch(failedAPIURL, requestOptions);
                if(result.ok){
                    const data = await result.text();
                    return JSON.parse(data);
                }
            }
        } else {
            return data;
        }
    });
}

 //    return fetch(failedAPIURL, requestOptions)
                //             .then(response => response.text().then(text => {
                //             const data = text && JSON.parse(text);
                //             if (!response.ok) {
                //                 if ([401, 403].indexOf(response.status) !== -1) {
                //                         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                //                         authenticationService.logout();
                //                         window.location.reload(true);
                //                 }
                //                 const error = (data && data.message) || response.statusText;
                //                 return Promise.reject(error);
                //             }
                //             return data;
                //     }));
                // });

/* 
notificaiton
-----------
    device_id
    groupd_id
    notification


    oma2.oma2_command_queue_expiry - done
    oma2.oma2_command_queue - done
    oma2.gateway_command_queue -done
    oma2.serial_num_group_mapping-done

    group_id |device_id       
---------|----------------
5        |IMEI:PERFGW1    
1        |IMEI:SGH725T53C 

VALUES('IMEI:SGH725T53C', 'Test Notification 2')
INSERT INTO vmsanode.notification
(device_id, notification)
VALUES('IMEI:PERFGW1', 'Test Notification 1');

mariadb-> serial_num, notification_id,command_payload ,queue_type, group_id



CREATE TABLE vmsanode.gateway_command_queue (
    serial_num text,
    notification_id bigint,
    command_payload text,
    PRIMARY KEY (serial_num, notification_id)
) 
CREATE TABLE vmsanode.oma2_command_queue_expiry (
    serial_num text,
    enqueue_time_in_millis bigint,
    notification_id bigint,
    PRIMARY KEY (serial_num, enqueue_time_in_millis)
)
// for getting group_id against serial_num
CREATE TABLE vmsanode.serial_num_group_mapping (
    serial_num text,
    group_id bigint,
    PRIMARY KEY (serial_num)
)

---------
CREATE TABLE vmsanode.oma2_command_queue (
    serial_num text,
    notification_id bigint,
    command_payload text,
    PRIMARY KEY (serial_num, notification_id)
) 

*/
