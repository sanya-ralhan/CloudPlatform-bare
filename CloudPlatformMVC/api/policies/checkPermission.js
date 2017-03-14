/**
 * checkPermission
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var status = require("../services/StatusCode").status;

module.exports = function(req, res, next) {
	//Find username paramenter
	console.log("SERVER LOG: Checking Permission in checkPermission.js")
	console.log(status);
	if(req.body.username || req.param('username'))
	{
		console.log("SERVER LOG: Checking username.")
		//Change the username to lowercase
		var username;
		if(req.body.username)
		  username = req.body.username.toLowerCase();
		else
		  username = req.param('username').toLowerCase();
	  
		  console.log("SERVER LOG: Finding token in user side.")
		  var aToken;
		  if(req.session.id)
		  	aToken = req.session.id;
		  else if(req.body.token)
			aToken = req.body.token;
		  else
		  {
		  	  console.log("SERVER LOG: Cannot find token in user side.");
			  res.json(status.CannotFindSessionOrToken.message, status.CannotFindSessionOrToken.code);
		  }
		  console.log("SERVER LOG: Finding user in the database.")
		User.findOneByUsername(username)
		.done(function(err, user){
			console.log("SERVER LOG: Finding Access Token.");
			AccessToken.findOneByToken(aToken)
			.done(function(err, token){
			  if(err)
			  {
				  console.log("SERVER LOG: Unknown Error in finding token.")
				  return res.json(status.UnknownError.message, status.UnknownError.code);
			  }
			  else
			  {
				  console.log("SERVER LOG: Checking user's permission.");
				  if(token.UserId == user.id || user.group === 'admin')
				  {
					  console.log("SERVER LOG: User has permission to proceed the next step.");
					  return next();
				  }
				  else
				  {
					  console.log("SERVER LOG: User has no permission to proceed the next step.")
					  return res.json(status.NotAuthorized.message, status.NotAuthorized.code);
				  }
			  }
			});	
		});
	}
	else
	{
	  console.log("SERVER LOG: User cannot be found.")
	  return res.json(status.UserDoesNotExist.message, status.UserDoesNotExist.code);
	}

