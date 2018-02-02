var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var UserSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String
});
var User = mongoose.model('users', UserSchema);
var app = express();
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index', {});
});

app.use(bodyParser.json()); 

app.post('/', function(req, res) {
	console.log(req.body)
	User.findOne({username: req.body.username, password: req.body.password}, function (err, user) {
		console.log(user)
		if (err) {
			return res.render('index', {message: err.message});
		}
		if (!user) {
			return res.render('index', {message: 'Sorry!'});
		}

		return res.render('index', {message: 'Welcome back ' + user.name + '!!!'});
	});
});

var server = app.listen(49090, function () {
	console.log('listening on port %d', server.address().port);
});
