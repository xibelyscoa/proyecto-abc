const MongoClient = require('mongodb').MongoClient;

var routes = require('./api/routes/routes'),
    express = require('express');

PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
generador_de_sopas = require('./sopa_de_letras');
crucipalabras = require('./crucipalabras');

var bodyParser = require('body-parser');
app = express();
const exphbs = require('express-handlebars');

port = process.env.PORT || 3000;
mongoose = require('mongoose');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')
app.use('/', express.static('public'));
app.get('/', function (req, res) {
    res.render('home')
})

app.get('/generador', function (req, res) {
    res.render('generador')
})


niveles = require('./api/models/nivelesSchema');
materias = require('./api/models/materiasSchema');
usuarios = require('./api/models/usuariosSchema');
planes = require('./api/models/planesSchema');
contenidos = require('./api/models/contenidosSchema');

var json_body_parser = bodyParser.json();
var urlencoded_body_parser = bodyParser.urlencoded({ extended: true });
app.use(json_body_parser);
app.use(urlencoded_body_parser);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://app:r6cI4tbiZa2Zc1nd@cluster0-shard-00-00-rchaz.mongodb.net:27017,cluster0-shard-00-01-rchaz.mongodb.net:27017,cluster0-shard-00-02-rchaz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
    useMongoClient: true,
});

var renderPlan = function (req, res,payload) {
    var doc = new PDFDocument();
    doc.fontSize(20).text('                            Planificación Escolar',50, 80)
    .moveDown(0.5)
    .fontSize(14).text('Nombre: '+payload['nombre']).moveDown(0.5)
    .fontSize(14).text('Correo Electrónico: '+payload['email']).moveDown(0.5)
    .fontSize(14).text('Grado: '+payload['grado']).moveDown(0.5);
    
    var x = 50;
    var y = 140;

    var size = 25;
    var tSize = 12;
    var tPos = 9;

    var cols = 18;
    
    var contenidos = payload['contenidos'];
    var palabras_cruci = [];
    contenidos.forEach(function (contenido) {
        var carro = 0;
        doc.fontSize(16).text('Contenido: '+contenido.unidad).moveDown()
            .fontSize(12).text(contenido.descripcion, { align: 'justify' }).moveDown();
        carro = carro + 50;
        var palabras = [];
        // Términos
        doc.fontSize(15).text('Términos del tema');
        contenido['keywords'].forEach(function (keyword) {
            palabras.push(keyword);
            palabras_cruci.push(keyword);
        });
        contenido['terminos'].forEach(function (termino) {
            carro = carro + 40;
            doc.fontSize(12).text(termino['nombre'] + ': ', { underline: true })
                .fontSize(12).text(termino['definicion'], { align: 'justify' }).moveDown();
            if (termino['ejemplos'] !== '') {
                doc.fontSize(12).text('Ejemplos: ' + termino['ejemplos']).moveDown();
            }
            if (termino['imagen'] !== '') {
                doc.image('contenidos/' + termino['imagen']);
            }
        });
        var miSopa = generador_de_sopas(palabras, cols);
        doc.addPage();

        doc.fontSize(18).text('Sopa de Letras ', 50, 80);
        doc.fontSize(12).text('Buscar las palabras: ');
        var busqueda = '';
        palabras.forEach(function (palabra) {
            busqueda += ' [ ' + palabra + ' ] ';
        });
        doc.fontSize(12).text(busqueda);
        var dic = 'AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚVWXYZ';
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < cols; j++) {
                var letra = miSopa[j][i];
                if (letra === ' ') {
                    letra = dic.charAt(Math.floor(Math.random() * dic.length));
                }
                doc.fontSize(tSize).text(letra,
                    i * size + x + tPos, j * size + y + tPos);
                doc.lineJoin('round').rect(i * size + x, j * size + y, size, size).stroke();
            }
        }
        doc.addPage();
        doc.fontSize(25).text('Sopa de Letras (Solución)', 50, 80).moveDown();
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < cols; j++) {
                var letra = miSopa[j][i];
                doc.fontSize(tSize).text(letra,
                    i * size + x + tPos, j * size + y + tPos);
                doc.lineJoin('round').rect(i * size + x, j * size + y, size, size).stroke();
            }
        }
        doc.addPage();

    });
    // Crucigrama
    var miCruciPalabras = crucipalabras(palabras_cruci, cols);
    doc.fontSize(25).text('Crucipalabras ', 50, 80).moveDown();
    var fin = 0;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < cols; j++) {
            var letra = miCruciPalabras[j][i];
            if (letra === ' ') {
                //                doc.fontSize(tSize).text('*',
                //                        i * size + x + tPos, j * size + y + tPos);
                //                doc.lineJoin('round').rect(i * size + x, j * size + y, size, size).lineWidth(1)
                //                        .fillOpacity(1)
                //                        .fillAndStroke("black", "#000");
            } else {
                doc.fontSize(tSize).text('',
                    i * size + x + tPos, j * size + y + tPos);
                doc.lineJoin('round').rect(i * size + x, j * size + y, size, size).stroke();
            }
            fin = j * size + y;
        }
    }
    doc.fontSize(12).text('Buscar las palabras: ', 50, fin);
    var busqueda = '';
    palabras_cruci.forEach(function (palabra) {
        busqueda += ' [ ' + palabra + ' ] ';
    });
    doc.fontSize(12).text(busqueda);
    doc.addPage();
    doc.fontSize(25).text('Crucipalabras (Solución)', 50, 80).moveDown();
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < cols; j++) {
            var letra = miCruciPalabras[j][i];
            if (letra === ' ') {
                //                doc.fontSize(tSize).text('*',
                //                        i * size + x + tPos, j * size + y + tPos);
                //                doc.lineJoin('round').rect(i * size + x, j * size + y, size, size).lineWidth(1)
                //                        .fillOpacity(1)
                //                        .fillAndStroke("black", "#000");
            } else {
                doc.fontSize(tSize).text(letra,
                    i * size + x + tPos, j * size + y + tPos);
                doc.lineJoin('round').rect(i * size + x, j * size + y, size, size).stroke();
            }
        }
    }
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*'
    });
    doc.pipe(res);
    doc.end();
    return;
};

app.get('/plan/:planId', function (req, res) {
    const url = 'mongodb://localhost/proyectoABC';
    const id=req.params.planId;
    var Plan = mongoose.model('Planes');
    Plan.findById({_id: id}, function (err, plan) {
        if (err)
            console.log(err);
        renderPlan(req,res,plan);
    });
});

routes(app);
app.listen(port);
console.log('Corriendo en el puerto ', port);