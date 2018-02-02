require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

var mongo = require('mongoskin');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');
db.bind('jobNumbers');
db.bind('servers');

// init data

users=db.users.findOne(function(err,users){

    console.log('data of users',users);
    if(!users){
        db.users.insertMany([
            {
                "username" : "chenguanxi",
                "hash" : "$2a$10$JR2zzjlTUoxf//QrwZJS3eW8h7UQz3KAPCU3XzYh/SE09.ZcjcjXG"
            },
            {
                "username" : "liuyan",
                "hash" : "$2a$10$7dzkjtDxKUuPLG1txhA20eh2d3I/RV5z8c1chUTQbIW.FINez7ZRq"
            },
            {
                "username" : "mowenwei",
                "hash" : "$2a$10$3LgFsLmtHiDiyslYTmJ.1OVbyy9hAwPTwLLR0SaIHSqKw2.0FP192"
            },
            {
                "username" : "lidan",
                "hash" : "$2a$10$VNp4HQuKl6nZ8OkuN/2wv.AExit07xFvnXG/7S6ulB0QrzSZwoTD."
            },
            {
                "username" : "wuyanzu",
                "hash" : "$2a$10$pWW9zgzRDnAMoFg7jEJA/ej/1KULNX2hJg6AYY5Xp0cn552fB6xHG"
            },
            {
                "username" : "liudahua",
                "hash" : "$2a$10$/EkUrKX.dNkVAj9n56hTA.63TUwsqaEDvHsmbZ/X4RKpaWXN8GRQ."
            },
            {
                "username" : "zhangxueyou",
                "hash" : "$2a$10$hwGh9yANYr1kfCtxQD1w3uhdOVGJYvdihd10VvG6vh4PnOoGYnG8S"
            },
            {
                "username" : "zhourunfa",
                "hash" : "$2a$10$Bwdr2Km8skUGNPDL.qtIKetcvxa.KIk7dmhwd/ksaa6MunDyKF9cG"
            },
            {
                "username" : "zhouxingchi",
                "hash" : "$2a$10$cimJUWrOyS7Fsl80aly./OGbH.QMGONl1t1GrD6KZZcxVmt/OJXCC"
            },
            {
                "username" : "lixiaolong",
                "hash" : "$2a$10$nhTrWhSvQGBb7Yp7jH4zVOb0Y8QlQuJ6C23iXyGzvfy0Ln5CiuIDm"
            },
            {
                "username" : "admin",
                "hash" : "$2a$10$EewB4bpNwfo9jugOoEsIROfpmTp5zwWjy4GItmi.QhzwTGBnjie2W"
            }
    ])
    }
})

jobNumbers=db.jobNumbers.findOne(function(err,jobNumbers){

    console.log('data of jobNumbers',jobNumbers);
    if(!jobNumbers){
        db.jobNumbers.insertMany([
        {"jobNumber":"puokr001","name":"chenguanxi","email":"chenguanxi@puokr.org"},
        {"jobNumber":"puokr002","name":"liuyan","email":"liuyan@puokr.org"},
        {"jobNumber":"puokr003","name":"mowenwei","email":"mowenwei@puokr.org"},
        {"jobNumber":"puokr004","name":"lidan","email":"lidan@puokr.org"},
        {"jobNumber":"puokr005","name":"wuyanzu","email":"wuyanzu@puokr.org"},
        {"jobNumber":"puokr006","name":"liudahua","email":"liudahua@puokr.org"},
        {"jobNumber":"puokr007","name":"zhangxueyou","email":"zhangxueyou@puokr.org"},
        {"jobNumber":"puokr008","name":"zhourunfa","email":"zhourunfa@puokr.org"},
        {"jobNumber":"puokr009","name":"zhouxingchi","email":"zhouxingchi@puokr.org"},
        {"jobNumber":"puokr010","name":"lixiaolong","email":"lixiaolong@puokr.org"},
        {"jobNumber":"puokr011","name":"admin","email":"admin@puokr.org"},
    ])
    }
})

servers=db.servers.findOne(function(err,servers){

    console.log('data of servers',servers);
    if(!servers){
        db.servers.insertMany([
        {"ip":"120.120.30.120","sshUserName":"root","sshPassword":"Z3jh4rm8","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "zhangxueyou",
            "zhourunfa"
        ]},
        {"ip":"120.120.30.121","sshUserName":"ubuntu","sshPassword":"ZcZG284C","OS":"Ubuntu","owners" : [ 
            "chenguanxi", 
            "mowenwei",
            "zhourunfa"
        ]},
        {"ip":"120.120.30.122","sshUserName":"root","sshPassword":"3gqnA6k8","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "zhangxueyou",
            "liudahua"
        ]},
        {"ip":"120.120.30.123","sshUserName":"root","sshPassword":"dDgQ64W8","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "wuyanzu"
        ]},
        {"ip":"120.120.30.124","sshUserName":"ubuntu","sshPassword":"E2Tgn2X8","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "zhangxueyou",
            "zhourunfa"
        ]},
        {"ip":"120.120.30.125","sshUserName":"root","sshPassword":"E2Tgn2X8","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "public"
        ]},
        {"ip":"120.120.30.126","sshUserName":"ubuntu","sshPassword":"Z3jh4rm8","OS":"ubuntu","owners" : [ 
            "public"
        ]},
        {"ip":"149.111.117.60","sshUserName":"root","sshPassword":"Vm98e8gZ","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "zhourunfa",
            "liudahua",
            "zhangxueyou",
            "admin",
        ]},
        {"ip":"149.111.117.61","sshUserName":"root","sshPassword":"2erZ67bL","OS":"Ubuntu","owners" : [ 
            "chenguanxi", 
            "zhangxueyou",
            "zhourunfa",
            "admin",
        ]},
        {"ip":"149.111.117.62","sshUserName":"root","sshPassword":"694EBCPK","OS":"CentOS","owners" : [ 
            "chenguanxi", 
            "zhangxueyou",
            "zhourunfa",
            "admin",
        ]},
        {"ip":"149.111.117.63","sshUserName":"ubuntu","sshPassword":"r8X7oPA6","OS":"Ubuntu","owners" : [ 
            "admin"
        ]},
        {"ip":"149.111.117.64","sshUserName":"root","sshPassword":"7eBg27Un","OS":"CentOS","owners" : [ 
            "admin"
        ]},
    ])
    }
})

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});