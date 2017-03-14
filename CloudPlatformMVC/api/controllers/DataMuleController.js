//function to get the GPS of data mule and return listofnearby nodes

GetGPS: function(req,res,next){
	
	var params = req.params.all();

	Mule.UpdateGPS(params,function(err,mule)){

	if (err) return next (err);

		res.status(201);
		res.json(mule);
	});

}
