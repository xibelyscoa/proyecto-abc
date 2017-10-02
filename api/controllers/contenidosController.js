var mongoose = require('mongoose');
Contenido = mongoose.model('Contenidos');

exports.listAll = function(req, res){
    Contenido.find({}, function(err, contenidos){
        if(err){
            res.send(err);
        }
        res.json(contenidos);
    });
};

exports.createOne = function(req, res){
    var New_Contenido = new Contenido(req.body); 
    New_Contenido.save(function(err, contenido){
        if(err){
            res.send(err);
        }
        res.json(contenido);
    });
};

exports.getOne = function(req, res){
    Contenido.findById(req.params.contenidoId, function(err, contenido){
        if(err)
            res.send(err);
        res.json(contenido);
    });
};

exports.updateOne = function(req, res){
    Contenido.findOneAndUpdate({_id: req.params.contenidoId}, req.body, {new: true}, function(err, contenido){
        if(err){
            res.send(err);
        }
        res.json(contenido);
    });
};

exports.deleteOne = function(req, res){
    Contenido.remove ({_id: req.params.contenidoId}, function(err, contenido){
        if(err){
            res.send(contenido);
        }
        res.json({mensaje: 'El contenido ha sido borrado'});
    });
};
