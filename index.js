var routes = require('./api/routes/routes'),
express= require('express');
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

bodyParser= require('body-parser');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost/proyectoABC',{
  useMongoClient: true,  
});
app.use(bodyParser.urlencoded ({ extended: true}));

routes(app);
app.listen(port);
console.log('Corriendo en el puerto ',port);