
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../../middleware/check-auth");
const isAdmin = require("../../middleware/is-admin");
const Role = require('../models/role')

router.get('/',checkAuth,isAdmin,(req,res,next) => {
    Role.find().exec().then(docs => {
        return res.status(200).json({
            role:docs
        });
    }).catch(err=> {
        return res.status(500).json({
            error:err
        });
    });
});


router.post('/',checkAuth,isAdmin,(req,res,next) => {
    const role = new Role({
        _id:mongoose.Types.ObjectId(),
        name: req.body.name
    });
    
    role.save().then(doc=> {
        return res.status(200).json({
            message:'Role created successfully',
            role:doc
        });
    }).catch(err=> {
        return res.status(500).json({
            error: err
        });
    })
});

router.delete('/:id',checkAuth,isAdmin,(req,res,next) => {
    if(req.params.id === '') {
        Role.remove({_id:req.params.id}).exec()
        .then(doc=>{
            return res.status(200).json({
                messag:"Role deleted successfully"
            });
        }).catch(err => {
            return res.status(500).json({error:err});
        });
    }
    res.status(200).json({
        data:"Deleted role successfully"
    });
});


module.exports = router;


