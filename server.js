var  express = require('express'),
	   engines = require('consolidate'),
	   swig = require('swig'),
	   shelf = require('./server/modules/shelf.js');

var app = express();

app.set('title', 'Wgen Shelf');

app.engine('html', engines.swig);

// set .html as the default extension 
app.set('view engine', 'html');
app.set('views', __dirname + '/client/tpl');

swig.init({ root: __dirname + '/client/tpl', allowErrors: true });

app.configure(function () {
    app.use(express.logger('default'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.static(__dirname + '/client'));
    app.use(express.bodyParser());
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Wgen Shelf Server Listening on " + port);
  console.log(app.routes)
});

/******Routes*******/
app.get('/', function(req, res) {
	res.render('index', {
    	app: 'Wgen Shelf'
  	});
});
app.get('/wgenshelf', function(req, res) {
	res.render('index', {
    	app: 'Wgen Shelf'
  	});
});

app.get('/wgenshelf/components', shelf.getComponents);
app.get('/wgenshelf/addcomponent', shelf.addComponent);
app.post('/wgenshelf/submitcomponent', shelf.submitComponent);
/******Routes*******/