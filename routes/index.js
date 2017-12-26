/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Prodajalec = require('../models/prodajalec');
const Uporabnik = require('../models/uporabnik');
const Vozilo = require('../models/vozilo');
const Jamstvo = require('../models/jamstvo');

const debug = false;

module.exports = function(server) {
	/*************************************************************
	 * LIST PRODAJALCI
	 *************************************************************/
	server.get('/prodajalci', (req, res, next) => {
		Prodajalec.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});


	/*************************************************************
	 * POST PRODAJALEC
	 *************************************************************/
	server.post('/prodajalci', (req, res, next) => {
		if (!req.is('application/json')) {
			console.error("Expecting 'application/json'");
			return;
				
			return next(
				new errors.InvalidContentError("Expecting 'application/json'")
			);
			
		}

		let data = req.body || {};

		let prodajalec = new Prodajalec(data);
		prodajalec.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}

			res.send(201);
			next();
		});
	});

	/*************************************************************
	 * GET PRODAJALEC
	 *************************************************************/
	server.get('/prodajalci/:id', (req, res, next) => {
		Prodajalec.findOne({ id: req.params.id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			if (doc == null){
				return next(errors.InvalidArgumentError("Zahtevani ID ne obstaja!"));
			}

			res.send(doc);
			next();
		});
	});
	
	/*************************************************************
	 * LIST UPORABNIKI
	 *************************************************************/
	server.get('/uporabniki', (req, res, next) => {
		Uporabnik.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	/*************************************************************
	 * GET UPORABNIK
	 *************************************************************/	 
	server.get('/uporabniki/:id', (req, res, next) => {
		Uporabnik.findOne({ id: req.params.id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			if (doc == null){
				return next(errors.InvalidArgumentError("Zahtevani ID uporabbnika ne obstaja!"));
			}

			res.send(doc);
			next();
		});
	});

	/*************************************************************
	 * POST UPORABNIK
	 *************************************************************/
	server.post('/uporabniki', (req, res, next) => {
		if (!req.is('application/json')) {
			console.error("Expecting 'application/json'");
			return;
				
			return next(
				new errors.InvalidContentError("Expecting 'application/json'")
			);
			
		}

		let data = req.body || {};

		let uporabnik = new Uporabnik(data);
		uporabnik.save(function(err) {
				if (err) {
					console.error(err);
					return next(new errors.InternalError(err.message));
					next();
				}

				Uporabnik.findOne({ _id: uporabnik._id }, function(err, doc) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				if (doc == null){
					return next(errors.InvalidArgumentError("Napaka pri shranjevanju!"));
				}

				res.send(doc);
				next();
			});		
		});
	});


	/*************************************************************
	 * LIST VOZILA
	 *************************************************************/
	server.get('/vozila', (req, res, next) => {
		Vozilo.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	/*************************************************************
	 * GET VOZILO
	 *************************************************************/	 
	server.get('/uporabniki/:id', (req, res, next) => {
		Vozilo.findOne({ id: req.params.id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			if (doc == null){
				return next(errors.InvalidArgumentError("Zahtevani ID uporabbnika ne obstaja!"));
			}

			res.send(doc);
			next();
		});
	});

	/*************************************************************
	 * POST VOZILA
	 *************************************************************/
	server.post('/vozila', (req, res, next) => {
		if (!req.is('application/json')) {
			console.error("Expecting 'application/json'");
			return;
				
			return next(
				new errors.InvalidContentError("Expecting 'application/json'")
			);
			
		}

		let data = req.body || {};

		let vozilo = new Vozilo(data);
		vozilo.save(function(err) {
				if (err) {
					console.error(err);
					return next(new errors.InternalError(err.message));
					next();
				}

				Vozilo.findOne({ _id: vozilo._id }, function(err, doc) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				if (doc == null){
					return next(errors.InvalidArgumentError("Napaka pri shranjevanju!"));
				}

				res.send(doc);
				next();
			});		
		});
	});



	/*************************************************************
	 * LIST JAMSTVA
	 *************************************************************/
	server.get('/jamstva', (req, res, next) => {
		Jamstvo.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	/*************************************************************
	 * GET JAMSTVO
	 *************************************************************/
	server.get('/jamstva/:id', (req, res, next) => {		 
		Jamstvo.findOne({'id': req.params.id}, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			
		}).populate('vozilo').populate('uporabnik').exec(function(err, docs){			
			res.send(docs);
			next();
		});

	});

	/*************************************************************
	 * LIST JAMSTVA AKTIVNA - GLOBALNO
	 *************************************************************/
	server.get('/aktivna-jamstva', (req, res, next) => {
		Jamstvo.find({'odobreno': true}, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			
		}).populate('vozilo').populate('uporabnik').exec(function(err, docs){			
			res.send(docs);
			next();
		});
	});

	/*************************************************************
	 * LIST JAMSTVA AKTIVNA - PO PRODAJALCIH
	 *************************************************************/ 
	server.get('/aktivna-jamstva/:id', (req, res, next) => {
		//Jamstvo.find({'odobreno': true}, function(err, docs) {
		Jamstvo.find({'odobreno': true}, function(err, docs) {
			if (err) {
				console.error(err);				
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}		

			}).populate('vozilo').populate('uporabnik', null, {sifra_avtohise: req.params.id}).where('uporabnik').ne(null).exec(function(err, docs){
			d = [];
			for (var i = 0; i<docs.length;i++) {				 
				if (docs[i].uporabnik != null && docs[i].uporabnik !== undefined) {				
					d.push(docs[i]);
				}
			}
	
			res.send(d); 
		});
	});

	/*************************************************************
	 * AKTIVACIJA JAMSTVA
	 *************************************************************/
	server.post('/aktivacija-jamstva', (req, res, next) => {
		if (!req.is('application/json')) {			 
			return next(
				new errors.InvalidContentError("Expecting 'application/json'")
			);
			
		}

		let data = req.body || {};

		/*************************************************************
		 * Parameter parsing
		 *************************************************************/
		let odobreno = data.odobreno;
		let vozilo = new Vozilo(data.vozilo);
		let uporabnik = new Uporabnik(data.uporabnik);
		 
		/*************************************************************
		 * Shrani vozilo
		 *************************************************************/
 		vozilo.id = null;
		vozilo.save(function(err) {
				if (err) {
					console.error(err);
					return next(new errors.InternalError(err.message));
					next();
				}											 
		});		 		

		/*************************************************************
		 * Shrani uporabnika
		 *************************************************************/
		
		uporabnik.id = null;
		uporabnik.save(function(err) {
				if (err) {
					console.error(err);
					return next(new errors.InternalError(err.message));
					next();
				} 				 		
		});		
		 		
		/*************************************************************
		 * Shrani jamstvo
		 *************************************************************/
		let jamstvo = new Jamstvo({ "odobreno": odobreno, "vozilo": vozilo._id, "uporabnik": uporabnik._id});
		jamstvo.id = null;
		jamstvo.save(function(err, jamstvo) {
				if (err) {
					console.error(err);
					return next(new errors.InternalError(err.message));
					next();
				}

				// vrni shranjeno z id-ji
				Jamstvo.findOne({ _id: jamstvo._id}, function(err, doc) {				
					 	if (err) {
							console.error(err);
							return next(new errors.InternalError(err.message));
							next();
						} 		
				}).populate('vozilo').populate('uporabnik').exec(function(err, doc){						 
						res.send(doc); 
						next(); 
				});
		});				 		 
 	});
 
};    