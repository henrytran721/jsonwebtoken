const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'pineapple', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created',
                authData
            })
        }
    })
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        firstName: 'Henry',
        lastName: 'Tran',
        password: 'pineapple123',
        email: 'henrytran721@gmail.com'
    }

    jwt.sign({user},'pineapple',(err, token) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({token})
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader) {
        // extract token from bearerHeader
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        // run the next callback in post request
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(8080, () => console.log('Port is listening on Port 8080'));