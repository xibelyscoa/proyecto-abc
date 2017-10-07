var routes = require('./api/routes/routes'),
express= require('express');
var bodyParser     = require('body-parser');
app= express();
const exphbs  = require('express-handlebars');
port= 3000;
mongoose= require('mongoose');

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.use('/', express.static('public'));
app.get('/', function (req, res) {
    res.render('home')
})

app.get('/generador', function (req, res) {
  res.render('generador')
})


niveles= require('./api/models/nivelesSchema');
materias= require('./api/models/materiasSchema');
usuarios= require('./api/models/usuariosSchema');
planes= require('./api/models/planesSchema');
contenidos= require('./api/models/contenidosSchema');

var json_body_parser = bodyParser.json();
var urlencoded_body_parser = bodyParser.urlencoded({ extended: true });
app.use(json_body_parser);
app.use(urlencoded_body_parser);

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost/proyectoABC',{
  useMongoClient: true,  
});

routes(app);
app.listen(port);
console.log('Corriendo en el puerto ',port);