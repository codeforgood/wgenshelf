exports.getComponents = function(req, res){
	res.render('viewcomponents', {
    	app: 'Wgen Shelf'
  	});
};

exports.addComponent = function(req, res){
	res.render('addcomponent', {
    	app: 'Wgen Shelf'
  	});
};