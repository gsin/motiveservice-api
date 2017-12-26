/**********************************************************************
*	PODATKOVNI MODEL UPORABNIKA VOZILA
*
*	Simon 26.12.2017
*
**********************************************************************/
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const autoIncrement = require('mongoose-auto-increment');

const UporabnikSchema = new mongoose.Schema(
	{
		// required	 
		ime: {
			type: String,
			required: true,
			trim: true,
		},
		priimek: {
			type: String,
			required: true,
			trim: true,
		},
		// optional
		kontaktna_st: {
			type: String,			 
			trim: true,
		},
		naslov: {
			type: String,			 
			trim: true,
		},
		kraj_poste: {
			type: String,			 
			trim: true,
		},
		postna_st: {
			type: String,			 
			trim: true,
		},
		kraj_rojstva: {
			type: String,			 
			trim: true,
		}, 
		datum_rojstva: {
			type: Date,			 			 
		}, 
		email: {
			type: String,			 
			trim: true,
		}, 
		sifra_avtohise: {
			type: String,			 
			trim: true,
		}, 
		soglasje_1: {
			type: Boolean,			 
			trim: true,
		}, 
		soglasje_2: {
			type: Boolean,			 
			trim: true,
		}, 
		soglasje_3: {
			type: Boolean,			 
			trim: true,
		}, 
		datum_pogodbe: {
			type: Date,			 			
		}, 
		
	},
	{
		collection: 'Uporabnik'
 	}	
);

UporabnikSchema.plugin(timestamps);
UporabnikSchema.plugin(mongooseStringQuery);

autoIncrement.initialize(mongoose.connection);
UporabnikSchema.plugin(autoIncrement.plugin, {model: 'Uporabnik', field: 'id', startAt: 1});


// clear json output
UporabnikSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}


const Uporabnik = mongoose.model('Uporabnik', UporabnikSchema);
module.exports = Uporabnik;