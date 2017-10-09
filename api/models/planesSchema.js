var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//El esquema para el plan completado
var planesSchema = new Schema({
  nombre:  {
      type: String,
  },
  email:  {
    type: String,
  },
  descripcion: {
    type: String,
  },
  fecha: {
    type: Date
  },
  contenidos:{
    type: Array
  },
  grado:{
    type: String
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