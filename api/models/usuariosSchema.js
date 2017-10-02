var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuariosSchema = new Schema({
  nombre:  {
      type: String,
      required: "Debe ingresar un nombre"
  },
  correo: {
    type: String,
    required: "Debe ingresar un nombre"
  },
  clave: {
    type: String,
    required: "Debe ingresar una contraseña"
  },
  status:{
    type: [{
        type: String,
        enum: ['activo','inactivo']
    }],
    default:['activo']
  } 
});
module.exports= mongoose.model('Usuarios',usuariosSchema);