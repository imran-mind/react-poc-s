const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const bodyParser = require('body-parser')
const cors = require('cors');
// var session = require('express-session')
const cookieParser = require('cookie-parser');
const connection = require('./db');
const dbQuery = require('./query')(connection)
const path = require('path');
const moment = require('moment');

const PORT = 5000;
app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(cookieParser('some_secret_1234'));
// just define your wanted config
const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    // secure: true, // to force https (if you use it)
    maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
    signed: true // if you use the secret with cookieParser,
};

/* Refresh token blog
https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#refresh_token

Server side JWT_TOKEN Implementation
------------------------------------------
step1. When user logging in with username/password, server need to give jwtToken (Refresh_Token will set in res cookie).
       JWT_Token would have expire time of 15 minutes (Industry standard) and Refresh token would be
       saved in to DB with long expiry like 1 month.

step2. For each subsequent api call verify jwt_token only , If Invalid through 401 error to the client
       , if Valid send the requested resource.

step3:->If jwt_token is invalid then client make api call /api/v1/refresh_token, at this time 
        we will read refresh_token from the req cookie object as below (line no 86).
        
step4:-> After reading refresh_token need to verify with DB for refresh token validity, 
        if refresh_token is invalid or expired then simply send 401 in the response
        if refresh_token is valid then create jwt token with new expiry time (15 mins)
        and send back to client {jwt_token, refresh_token, data}. 

step5. If user logout from the app then we need to delete refresh token of that user and set empty

Client side JWT_TOKEN implementation
---------------------------------------

step1. Client will call /login api with with username/password and get the below payload
{
  "access_token": "BBBB2kXITHELmWblJigbHEuoFdfRhOwGA0QNnumBI8XOVSs0HtOHEU-wvaKrkMLfxxaB1O4poRg2svCWWgwhebQhqrETYlLikJJMgRAvH1ostjXd3DP3BtwzCGeTQ7K9vvAqfQK5iG_eyS-q-y8WNt2SnZKZumGaeUw_zKqtgCQavfEVCddKHcHLaLPGVUvjCH_KW0DJIdUMXd90kWqwuw3UKH27ki5raFDPuMyQXLYxkqq4mYU-IUuZRwq1pcrYp1Vv-ltbA_svUxGt_xeWeSxKkmgivY_DlT3jQylL44q36ybGBSbaFn-UU7zzio4EmOzdmm2tlGwG7dDeivdPDsGbj5ig",
  "expires_in": 86400,
  "refresh_token": "AQWAft_WjYZKwuWXLC5hQlghgTam-tuT8CvFej9-XxGyqeER_7jTr8HmjiGjqil13i7gMFjyDxh1g7C_G1gyTZmfcD0Bo2oEHofNAkr_76mSk84sppsGbygwW-5oLsb_OH_EXADPIFo0kppznrK55VMIBv_d7SINunt-7DtXCRAv0YnET5KroQOlmAhc1_HwW68EZniFw1YnB2dgDSxCkXnrfHYq7h63w0hjFXmgrdxeeAuOHBHnFFYHOWWjI8sLenPy_EBrgYIitXsAkLUGvZXlCjAWl-W459feNjHZ0SIsyTVwzAQtl5lmw1ht08z5Du-RiQahQE0sv89eimHVg9VSNOaTvw",
  "refresh_token_expires_in": 439200
}
Need to maintain App level variable for keeping access_token.
called let access_token = "token";

step2. Call subsequent api call with access_token to the server. there would be two below case
       
       Failure (status_code=> 401)
       silently call /refresh_token API , it will again give you the same login response as above.
       then make use of access_token and call subsequent api call.

       Success (status_code=> 200)
       Client would get data happily :)



step3. What if someone refresh the page.
      
       Definitly we would lost access_token then will check below condition
       if(!access_token){
           make refresh_toke api call and get fresh tokens (access_token,refresh_token,expiries);
       }
*/

app.post('/api/v1/signup', async (req, res) => {
    const user = req.body;
    // { username: 'test', password: 'test' }
    if (user.username && user.password) {
        try {
            await dbQuery.insertUser(user);
            // const refreshToken = auth.createRefreshToken({...user, personid: result.insertId});
            // console.log(refreshToken)
            // const updateResult = await dbQuery.updateUser(result.insertId, refreshToken);
            // console.log(' updateResult ',updateResult)
            return res.status(201).json({ status: 201, message: 'ok' });
        } catch (err) {
            return res.status(500).json({ status: 500, message: '**Please provide username and password' });
        }
    } else {
        return res.status(500).json({ message: '=>Please provide username and password' });
    }
})

app.post('/api/v1/login', async (req, res) => {
    const user = req.body;
    console.log('login came')
    if (user.username && user.password) {
        try {
            console.log('--inside login', user)
            const result = await dbQuery.getUserByCreds(user);
            const accessToken = auth.createJWT(result[0]);
            const refreshToken = auth.createRefreshToken(result[0]);
            await dbQuery.updateUser(result[0].personid, refreshToken);
            const uesrResponse = {
                ...result[0], accessToken
            }
            console.log('refreshToken cookie part ', refreshToken, cookieConfig);
            res.cookie('refreshToken', refreshToken, cookieConfig);
            console.log('res.cookie ', res.cookie);
            res.send(uesrResponse);
            // return res.status(200).json(uesrResponse);
        } catch (err) {
            return res.status(500).json({ status: 500, message: 'Username or password is incorrect' });
        }
    } else {
        return res.status(500).json({ message: 'Please provide username and password' });
    }
});

// make /set route 
app.get('/set', (req, res) => {
    // MAIN CODE HERE :
    res.cookie('test', 'some asdfdsa value', cookieConfig);
    res.send('set cookie');
});

app.get('/api/v1/refresh_token', async (req, res) => {
    // create new jwt token with new expiry and return back to the client
    // Fetching cookie's refresh token which we had stored first login
    const signedCookies = req.signedCookies; // get signed cookies
    const cookieRefreshToken = signedCookies ? signedCookies.refreshToken : null;
    console.log('our test signed cookie:', cookieRefreshToken);
    if (!cookieRefreshToken) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    try {
        let decodeRefreshToken = auth.decodeRefreshToken(cookieRefreshToken);
        console.log(' Cookie Refresh Token ', decodeRefreshToken.userId);
        if (decodeRefreshToken.exp <= moment().unix()) {
            return res.status(401).json({
                code: 401, message: "Session expired please login again",
                status: 'failed', reason: 'Session expired'
            });
        }
        const userId = decodeRefreshToken.userId;
        console.log('************* ', userId)
        const userInfo = await dbQuery.getUserById(userId);
        if (!userInfo)
            return res.status(401).json({ message: "UNAUTHORIZED" });

        // Checking token which is coming from cookie is valid or not by comparing with DB token
        // But Before that need to fetch token from DB and check the Refresh token expiry first
        // Need to make call for refresh token expiry call from here
        if (cookieRefreshToken !== userInfo[0].refresh_token) {
            res.status(401).json({ status: 401, message: 'UNAUTHORIZED' });
        } else {
            const jwtToken = auth.createJWT(userInfo);
            // res.cookie('refreshToken', userInfo.refresh_token, cookieConfig);
            res.status(200).json({
                accessToken: jwtToken, jwtExpiry: 60,
                firstName: userInfo.username, id: userInfo.personid
            })
        }
    } catch (err) {
        return res.status(401).json({ message: ' UNAUTHORIZED', err })
    }
});

// make /set route 
app.get('/get', (req, res) => {
    // MAIN CODE HERE :
    const signedCookies = req.signedCookies; // get signed cookies
    console.log('signed-cookies:', signedCookies);
    const cookies = req.cookies; // get not signed cookies
    console.log('not-signed-cookies:', cookies);
    // or access directly to one cookie by its name :
    const myTestCookie = req.signedCookies.refreshToken;
    console.log('our test signed cookie:', myTestCookie);
    res.send('get cookie');
});

app.get('/api/v1/users', auth.ensureAuthenticated, async (req, res) => {
    const users = [{ firstName: 'imran', lastName: 'Shaikh', id: 1 },
    { firstName: 'Sonu', lastName: 'Nigam', id: 2 }, { firstName: 'Rakesh', lastName: 'Kumar', id: 3 }]
    // auth.decodeToken(req.headers.authorization, (err, result) => {
    //     console.log('result jwt token ', result, err)
    // });
    return res.status(200).json({ status: 200, message: 'SUCCESS', data: users });
});

app.listen(PORT, () => {
    console.log('Auth Server is Launched...' + PORT);
});

// cookieParser
// secure cookie (setSecureCookie)
// Same site
// httpOnly

// add refrer
// how to encrypt and decrypt token at server and client
// sha512