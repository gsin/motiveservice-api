/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Prodajalec = require('../models/prodajalec');

module.exports = function(server) {
	/**
	 * LIST
	 */
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


	/**
	 * POST
	 */
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

	/**
	 * GET
	 */
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
	
};    