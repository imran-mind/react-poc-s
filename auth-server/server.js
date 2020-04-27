const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());
app.options('*', cors());
const PORT = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req,res) =>{
    res.status(200).json({ status:200, message: 'PONG' })
});

app.post('/api/v1/login', (req,res)=>{
    console.log(req.body)
    if(req.body && req.body.username && req.body.password ){
        const obj = {
            _id: 1,
            username: req.body.username
        };
        const jwtToken = auth.createJWT(obj);
        res.status(200).json({token: jwtToken,firstName: 'imran',lastName: 'Shaikh',id:1})
    }else{
        res.status(401).json({ status:401, message: 'UNAUTHORIZED' })
    }
});

app.get('/api/v1/users', auth.ensureAuthenticated, async(req,res)=>{

    const users = [{firstName: 'imran',lastName: 'Shaikh',id:1},
    {firstName: 'Sonu',lastName: 'Nigam',id:2},{firstName: 'Rakesh',lastName: 'Kumar',id:3}]
    console.log(req.query.token)
    auth.decodeToken(req.headers.authorization, (err,result)=>{
        console.log('result jwt token ',result,err)
        return res.status(200).json({status:200, message: 'SUCCESS', tokenInfo: result, data: users });
    });
});

app.listen(PORT, () => {
    console.log('Auth Server is Launched...');
});