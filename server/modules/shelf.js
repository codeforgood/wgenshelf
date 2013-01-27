var mongoose = require('mongoose'),
	Fs = require('fs');

var mongoUri = 'mongodb://heroku_app11362279:1st2dvsvqnnemq5q21h61m751@ds049467.mongolab.com:49467/heroku_app11362279' || 'mongodb://localhost/wgenshelf';

mongoose.connect(mongoUri);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
   console.log("Successfully connected to MongoInstance");
});

var ComponentSchema = mongoose.Schema({
    name: String,
    desc: String,
    url: String,
    code: String,
    date: { type: Date, default: Date.now }
})

var Component = mongoose.model('Component', ComponentSchema)

exports.getComponents = function(req, res){

	Component.find({},'name desc url code', function (err, components) {
 		if (err) return handleError(err);
  		console.log(components);
  		res.render('viewcomponents', {
    		'app': 'Wgen Shelf',
    		'components': components
  		});
	});
};

exports.addComponent = function(req, res){
	res.render('addcomponent', {
    	app: 'Wgen Shelf'
  	});
};

exports.voteComponent = function(req, res){
	console.log(req.params.id);

	Component.update({'_id': req.params.id}, { $inc: { votes: 1 }}, function (err, success) {
 		if (err) return handleError(err);
  		console.log(success);
  		res.send(success);
  	});
};

exports.getComponent = function(req, res){
	console.log(req.params.id);

	Component.findOne({'_id' : req.params.id},'name desc url code', function (err, component) {
		if (err) return handleError(err);
  		res.render('viewcomponent', {
    		'app': 'Wgen Shelf',
    		'component': component
  		});
	});	
};

exports.submitComponent = function(req, res){
	console.log(req.body.componentName);
	console.log(req.body.componentDesc);
	console.log(req.body.codeRepo);
	console.log(req.body.componentCode);

	var comp = new Component({ name: req.body.componentName, desc: req.body.componentDesc, 
								url: req.body.codeRepo, code: req.body.componentCode});
	console.log('Adding Component with Name: ' + comp.name);

	comp.save(function (err, note) {
	  console.log('Component added successfully: ' + comp._id);
	  res.redirect('/wgenshelf/addcomponent');
	});
};