(function(){
	var JsSHA = require('./sha1'),
		dataStore = null;
	module.exports = {
		"middleware": function(req, res, next){
			var container = null, sign,shaObj;
			if(req.body.publicKey && req.body.signature){
				container = req.body;
			}
			if(req.query.publicKey && req.query.signature){
				container = req.query;
			}
			if(!container){
				res.status(401);
				res.json({
					"error": "PublicKey and Signature required on payload or query string"
				});
			}else{
				dataStore.getPrivateKey(container.publicKey, function(err, privateKey){
					var key;
					if(!privateKey){
						res.status(401);
						res.json({
							"error": "Authentication required, invalid publicKey"
						});
					}else{
						sign = [];
						for(key in container){
							if(container.hasOwnProperty(key) && key !== "signature"){
								sign.push(key + "=" +container[key]);
							}
						}
						sign = sign.join("&");
						shaObj = new JsSHA(sign, "ASCII");
						sign = shaObj.getHMAC(privateKey,"ASCII","HEX");
						if(sign === container.signature){
							next();
						}else{
							res.status(401);
							res.json({"error":"Authentication required, Authentication failed!"});
						}
					}
				});
			}
		},
		"setDataStore": function(ds){
			dataStore = ds;
		}
	};
}());