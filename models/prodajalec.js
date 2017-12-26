const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const autoIncrement = require('mongoose-auto-increment');

const ProdajalecSchema = new mongoose.Schema(
	{		 
		naziv: {
			type: String,
			required: true,
			trim: true,
		}
		
	},
	{
		collection: 'Prodajalec'
	}	
);

ProdajalecSchema.plugin(timestamps);
ProdajalecSchema.plugin(mongooseStringQuery);

autoIncrement.initialize(mongoose.connection);
ProdajalecSchema.plugin(autoIncrement.plugin, {model: 'Prodajalec', field: 'id', startAt: 1});

// clear json output
ProdajalecSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}


const Prodajalec = mongoose.model('Prodajalec', ProdajalecSchema);
module.exports = Prodajalec;