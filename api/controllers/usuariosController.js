var mongoose = require('mongoose');
Usuario = mongoose.model('Usuarios');

exports.listAll = function(req, res){
    Usuario.find({}, function(err, usuarios){
        if(err){
            res.send(err);
        }
        res.json(usuarios);
    });
};

exports.createOne = function(req, res){
    var New_Usuario = new Usuario(req.body); 
    New_Usuario.save(function(err, usuario){
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
};

exports.getOne = function(req, res){
    Usuario.findById(req.params.usuarioId, function(err, usuario){
        if(err)
            res.send(err);
        res.json(usuario);
    });
};

exports.updateOne = function(req, res){
    Usuario.findOneAndUpdate({_id: req.params.usuariolId}, req.body, {new: true}, function(err, usuario){
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
};

exports.deleteOne = function(req, res){
 Usuario.remove ({_id: req.params.usuariolId}, function(err, usuario){
        if(err){
            res.send(err);
        }
        res.json({mensaje: 'El usuario ha sido borrado'});
    });
};
