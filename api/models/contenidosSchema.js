var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contenidosSchema = new Schema({
  unidad:  {
      type: String,
      required: "Debe ingresar una unidad"
  },
  grado: {
    type: [{
      type: String
  }]

  },
  materia: {
    type: [{
      type: String
  }]

  },
  keywords: {
    type: [{
      type: String
  }]
  },
  descripcion: {
    type: String,
    required: "Debe ingresar una descripción en formato de texto"
  },
  glosario: {
    type: []
  },
  status:{
    type: [{
        type: String,
        enum: ['activo','inactivo']
    }],
    default:['activo']
  },
  imagen: {
    type: String
  }
});
module.exports= mongoose.model('Contenidos',contenidosSchema);