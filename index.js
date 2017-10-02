var routes = require('./api/routes/routes'),
express= require('express');
app= express();
port= 3000;

mongoose= require('mongoose');

niveles= require('./api/models/nivelesSchema');
materias= require('./api/models/materiasSchema');
usuarios= require('./api/models/usuariosSchema');
planes= require('./api/models/planesSchema');
contenidos= require('./api/models/contenidosSchema');

bodyParser= require('body-parser');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost/proyectoABC',{
  useMongoClient: true,  
});
app.use(bodyParser.urlencoded ({ extended: true}));

routes(app);
app.listen(port);
console.log('Corriendo en el puerto ',port);