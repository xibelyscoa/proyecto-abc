var mongoose = require('mongoose');
var Nivel = mongoose.model('Niveles');

exports.listAll = function(req, res){
    console.log(Date.toString,'> Listar Niveles');
    Nivel.find({}, function(err, niveles){
        if(err){
            console.log('Error de niveles');
            res.send(err);
        }
        console.log(Date.toString,'> Enviando respuesta');
        res.json(niveles);
    });
};

exports.createOne = function(req, res){
    var New_Nivel = new Nivel(req.body); 
    New_Nivel.save(function(err, nivel){
        if(err){
            res.send(err);
        }
        res.json(nivel);
    });
};

exports.getOne = function(req, res){
    Nivel.findById(req.params.nivelId, function(err, nivel){
        if(err)
            res.send(err);
        res.json(nivel);
    });
};

exports.updateOne = function(req, res){
    Nivel.findOneAndUpdate({_id: req.params.nivelId}, req.body, {new: true}, function(err, nivel){
        if(err){
            res.send(err);
        }
        res.json(nivel);
    });
};

exports.deleteOne = function(req, res){
    Nivel.remove ({_id: req.params.nivelId}, function(err, nivel){
        if(err){
            res.send(err);
        }
        res.json({mensaje: 'Su nivel ha sido borrado'});
    });
};
