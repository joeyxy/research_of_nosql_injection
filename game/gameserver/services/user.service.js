var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');
db.bind('jobNumbers');
db.bind('servers');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getServers = getServers;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();
    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    console.log('userParam.jobnumber',userParam.jobnumber);
    
    // validation

    if(userParam.username =="admin"){

        deferred.reject('用户名 admin 不允许注册');
    }
    db.jobNumbers.findOne(
        { jobNumber: userParam.jobnumber },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            console.log('user',user);

            if (!user) {
                // jobnumber already exists
                deferred.reject('工号 "' + userParam.jobnumber + '"不存在');
            } else {
                const jobNumberArray=['puokr001','puokr002','puokr003','puokr004','puokr005',
                'puokr006','puokr007','puokr008','puokr009','puokr010','puokr011',];

                if(jobNumberArray.indexOf(userParam.jobnumber)>=0){
                    deferred.reject('工号 "' + userParam.jobnumber + '"已被注册');
                }

                db.users.findOne(
                    { username: userParam.username },
                    function (err, user) {
                        if (err) deferred.reject(err.name + ': ' + err.message);
            
                        if (user) {
                            // username already exists
                            deferred.reject('用户名 "' + userParam.username + '" 已存在');
                        } else {
                            createUser();
                        }
                    });
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, ['password','jobnumber']);

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });

        createOwnServer();
    }

    function createOwnServer(){
        db.servers.insert(
            {"ip":"6.6.6.6","sshUserName":userParam.username,"sshPassword":Math.random().toString(36).substr(2),"OS":"CentOS","owners" : [ 
                userParam.username
            ]},
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getServers(username){
    var deferred = Q.defer();
    console.log("function(){return ((this.owners.indexOf('admin')<0 && this.owners.indexOf('"+username+"')>=0))|| this.owners.indexOf('public')>=0 }");
    db.servers.find({ $where:"function(){return ((this.owners.indexOf('admin')<0 && this.owners.indexOf('"+username+"')>=0))|| this.owners.indexOf('public')>=0 }" }).toArray(function (err, servers) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        console.log(servers);

        deferred.resolve(servers);
    });

    return deferred.promise;
}