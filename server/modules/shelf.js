var mongoose = require('mongoose'),
	Fs = require('fs');

mongoose.connect('mongodb://localhost/wgenshelf');

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
   console.log("Successfully connected to MongoInstance");
});

var ComponentSchema = mongoose.Schema({
    name: String,
    desc: String,
    date: { type: Date, default: Date.now }
})

var Component = mongoose.model('Component', ComponentSchema)

exports.getComponents = function(req, res){

	Component.find({},'name desc', function (err, components) {
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

exports.submitComponent = function(req, res){
	console.log(req.body.componentName);
	console.log(req.body.componentDesc);

	var comp = new Component({ name: req.body.componentName, desc: req.body.componentDesc});
	console.log('Adding Component with Name: ' + comp.name);

	comp.save(function (err, note) {
	  console.log('Component added successfully: ' + comp._id);
	  res.redirect('/wgenshelf/addcomponent');
	});
};