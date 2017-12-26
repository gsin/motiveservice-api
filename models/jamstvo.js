/**********************************************************************
*	PODATKOVNI MODEL JAMSTVA
*
*	Simon 26.12.2017
*
**********************************************************************/
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const autoIncrement = require('mongoose-auto-increment');

const Uporabnik = require('../models/uporabnik');
const Vozilo = require('../models/vozilo');


const JamstvoSchema = new mongoose.Schema(
	{
		// required	 
		odobreno: {
			type: Boolean,
			required: true,			 
		},
		 
		vozilo: { 
			type: mongoose.Schema.Types.ObjectId, ref: 'Vozilo',
			required: true,			 
		},	
		uporabnik: { 
			type: mongoose.Schema.Types.ObjectId, ref: 'Uporabnik',
			required: true,			 
		},	
	},
	{
		collection: 'Jamstvo'
 	}	
);

JamstvoSchema.plugin(timestamps);
JamstvoSchema.plugin(mongooseStringQuery);

autoIncrement.initialize(mongoose.connection);
JamstvoSchema.plugin(autoIncrement.plugin, {model: 'Jamstvo', field: 'id', startAt: 1});


// clear json output
JamstvoSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;

  if (obj.vozilo != null){
	  delete obj.vozilo._id;
	  delete obj.vozilo.createdAt;
	  delete obj.vozilo.updatedAt;
	  delete obj.vozilo.__v;  	
  }


  if (obj.uporabnik != null){
	  delete obj.uporabnik._id;
	  delete obj.uporabnik.createdAt;
	  delete obj.uporabnik.updatedAt;
	  delete obj.uporabnik.__v;
	}

  return obj;
}


const Jamstvo = mongoose.model('Jamstvo', JamstvoSchema);
module.exports = Jamstvo;