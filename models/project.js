var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {type: String},
  description: {type: String},
  imageurl: {type: String},
  demourl: {type: String},
  browsers: [],
  source: {type: String},
  builton: [],
  notes: {type: String},
  mechanism: {type: String},
  mode: {type: String},
  cache: {type: String}
});

module.exports = mongoose.model('Project', ProjectSchema);
