var mongoose = require('mongoose');
Materia = mongoose.model('Materias');

exports.listAll = function(req, res){
    Materia.find({}, function(err, materias){
        if(err){
            res.send(err);
        }
        res.json(materias);
    });
};

exports.createOne = function(req, res){
    var New_Materia = new Materia(req.body); 
    New_Materia.save(function(err, materia){
        if(err){
            res.send(err);
        }
        res.json(materia);
    });
};

exports.getOne = function(req, res){
    Materia.findById(req.params.materiaId, function(err, materia){
        if(err)
            res.send(err);
        res.json(materia);
    });
};

exports.updateOne = function(req, res){
    Materia.findOneAndUpdate({_id: req.params.materiaId}, req.body, {new: true}, function(err, materia){
        if(err){
            res.send(err);
        }
        res.json(materia);
    });
};

exports.deleteOne = function(req, res){
    Materia.remove ({_id: req.params.materiaId}, function(err, materia){
        if(err){
            res.send(materia);
        }
        res.json({mensaje: 'Su materia ha sido borrado'});
    });
};
