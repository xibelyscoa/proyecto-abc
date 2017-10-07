'use strict';
module.exports = function(app){
    var niveles= require('../controllers/nivelesController');
    var materias= require('../controllers/materiasController');
    var contenidos= require('../controllers/contenidosController');
    var planes= require('../controllers/planesController');
    var usuarios= require('../controllers/usuariosController');
    
    app.route('/api/niveles/')
        .get(niveles.listAll)
        .post(niveles.createOne);
    app.route('/api/niveles/:nivelId')
        .get(niveles.getOne)
        .put(niveles.updateOne)
        .delete(niveles.deleteOne);

    app.route('/api/materias/')
        .get(materias.listAll)
        .post(materias.createOne);
    app.route('/api/materias/:materiaId')
        .get(materias.getOne)
        .put(materias.updateOne)
        .delete(materias.deleteOne);

    app.route('/api/contenidos/')
        .get(contenidos.listAll)
        .post(contenidos.createOne);
    app.route('/api/contenidos/by/')
        .post(contenidos.listByFilters);
    app.route('/api/contenidos/:contenidoId')
        .get(contenidos.getOne)
        .put(contenidos.updateOne)
        .delete(contenidos.deleteOne);
    
    app.route('/api/planes/')
        .get(planes.listAll)
        .post(planes.createOne);
    app.route('/api/planes/:planlId')
        .get(planes.getOne)
        .put(planes.updateOne)
        .delete(planes.deleteOne);

    app.route('/api/usuarios/')
        .get(usuarios.listAll)
        .post(usuarios.createOne);
    app.route('/api/usuarios/:usuarioId')
        .get(usuarios.getOne)
        .put(usuarios.updateOne)
        .delete(usuarios.deleteOne);
}