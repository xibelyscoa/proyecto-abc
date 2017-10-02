var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nivelesSchema = new Schema({
  nombre:  {
      type: String,
      required: "Debe ingresar un nivel"
  },
  status:{
    type: [{
        type: String,
        enum: ['activo','inactivo']
    }],
    default:['activo']
  } 
});
module.exports= mongoose.model('Niveles',nivelesSchema);