const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length){
            res.status(500).json({
                message: "Mail Exists"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        message: "Signup Unsuccessful"

                    })
                }else {
                    const info = {
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }

                    const user = new User(info);
                    user.save()
                    .then(result => res.status(200).json(result))
                    .catch(err => res.status(500).json(err));
                }
            })
        }
    })
    .catch(err => res.status(500).json(err));

})



module.exports = router;