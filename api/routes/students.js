const express = require('express'); 
const router = express.Router();        
const mongoose = require('mongoose');  

const Student = require('../models/student');

router.get('/', (req, res, next) => {
    Student.find()
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
})

router.post('/',( req, res, next)=> {
  
    const information ={                              
      
          _id : mongoose.Types.ObjectId(),                       
          Name : req.body.Name,                                
          Batch : req.body.Batch,                                
                                         
        }
        const student = new Student(information);            
        student.save()                                      
        .then(result => res.status(200).json(result))         
        .catch(err => res.status(500).json(err))             
   
   
    })

    router.get('/:studentId', (req, res, next) => {

        const id = req.params.studentId;

        Student.findById(id)
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
    })

    router.delete('/:studentId', (req, res, next) => {

        const id = req.params.studentId;

        Student.deleteOne({_id: id})
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
    })

    router.patch('/:studentId', (req, res, next) => {
        const id = req.params.studentId;

        const updateOps = {};
        for(const info of req.body){
            updateOps[info.key] = info.value;
        }

        Student.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({
            message: "Error"
        }));
    })
        
        
        module.exports = router;