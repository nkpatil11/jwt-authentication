var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

app.get('/api/get', function(req, res){
    res.json({message: 'get responce coming..'});
});

app.post('/api/post', verifyToken, function(req, res){
    jwt.verify(req.token, 'nkpatilsecretkey', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post responce coming..',
                data 
            });
        }
    });
});

app.post('/api/login', function (req, res){
    var user = {
        id: 1,
        name: 'Nk',
        email: 'nk@gmail.com',
        city: 'indore'
    };
    var token = jwt.sign(user, 'nkpatilsecretkey', {expiresIn: '2m'});
    res.json({token: token});
});

function verifyToken(req, res, next) {
    var headerToken = req.headers['authorization'];
    if (headerToken) {
        req.token = headerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, function (req, res) {
    console.log('app listening on port 5000')
});