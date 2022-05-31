const express = require('express'); 
const router = express.Router();        
const mongoose = require('mongoose');  

const Student = require('../models/student');

router.get('/', (req, res, next) => {
    res.status(200).json({
        mesage: "Get Request"
    })
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
        
        module.exports = router;
