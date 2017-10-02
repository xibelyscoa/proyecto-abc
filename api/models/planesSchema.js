var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planesSchema = new Schema({
  nombre:  {
      type: String,

  },
  status:{
    type: [{
        type: String,
        enum: ['activo','inactivo']
    }],
    default:['activo']
  } 
});
module.exports= mongoose.model('Planes',planesSchema);