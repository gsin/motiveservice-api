const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ProdajalecSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,		
			unique: true,
		},
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