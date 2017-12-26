/**********************************************************************
*	PODATKOVNI MODEL VOZILA
*
*	Simon 26.12.2017
*
**********************************************************************/
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const autoIncrement = require('mongoose-auto-increment');

const VoziloSchema = new mongoose.Schema(
	{
		// required	 
		znamka: {
			type: String,
			required: true,
			trim: true,
		},
		model: {
			type: String,
			required: true,
			trim: true,
		},
		registrska_st: {
			type: String,
			required: true,
			trim: true,
		},


		// optional
		kontaktna_st: {
			type: String,			 
			trim: true,
		},		
		st_sasije: {
			type: String,			 
			trim: true,
		},
		moc_motorja: {
			type: Number,			 			 
		},
		tip_motorja: {
			type: String,			 
			trim: true,
		},
		prva_registracija: {
			type: Date,			 			
		},
		km: {
			type: Number,			 			 
		}, 
		ccm: {
			type: Number,			 			 
		}, 
		gorivo: {
			type: String,			 
			trim: true,
		}, 
		pogon: {
			type: String,			 
			trim: true,
		}, 
		menjalnik: {
			type: String,			 		 
		}, 
		komercialno_vozilo: {
			type: Boolean,			 			 
		}, 
		datum_prodaje: {
			type: Date,			 			 
		}, 
		datum_pogodbe: {
			type: Date,			 			 
		}, 
		pricetek_veljavnosti: {
			type: Date,			 			 
		}, 
		
	},
	{
		collection: 'Vozilo'
 	}	
);

VoziloSchema.plugin(timestamps);
VoziloSchema.plugin(mongooseStringQuery);

autoIncrement.initialize(mongoose.connection);
VoziloSchema.plugin(autoIncrement.plugin, {model: 'Vozilo', field: 'id', startAt: 1});


// clear json output
VoziloSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}


const Vozilo = mongoose.model('Vozilo', VoziloSchema);
module.exports = Vozilo;