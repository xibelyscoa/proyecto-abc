var mongoose = require('mongoose');
var Plan = mongoose.model('Planes');

exports.listAll = function(req, res){
    Plan.find({}, function(err, planes){
        if(err){
            res.send(err);
        }
        res.json(planes);
    });
};

exports.createOne = function(req, res){
    var New_Plan = new Plan(req.body); 
    New_Plan.save(function(err, plan){
        if(err){
            res.send(err);
        }
        res.json(plan);
    });
};

exports.getOne = function(req, res){
    Plan.findById(req.params.planId, function(err, plan){
        if(err)
            res.send(err);
        res.json(plan);
    });
};

exports.updateOne = function(req, res){
    Plan.findOneAndUpdate({_id: req.params.planId}, req.body, {new: true}, function(err, plan){
        if(err){
            res.send(err);
        }
        res.json(plan);
    });
};

exports.deleteOne = function(req, res){
    Plan.remove ({_id: req.params.planId}, function(err, plan){
        if(err){
            res.send(plan);
        }
        res.json({mensaje: 'Su plan ha sido borrado'});
    });
};
