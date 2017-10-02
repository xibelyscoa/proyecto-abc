var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materiasSchema = new Schema({
  area:  {
      type: String,
      required: "Debe ingresar un área de aprendizaje"
  },
  status:{
    type: [{
        type: String,
        enum: ['activo','inactivo']
    }],
    default:['activo']
  } 
});
module.exports= mongoose.model('Materias',materiasSchema);