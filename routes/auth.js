const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');



router.post('/createuser',[
    body('email','Enter a valid email.').isEmail(),
    body('name','Enter a valid name.').isLength({ min: 3 }),
    body('password','Enter a valid password.').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

    let user = await User.findOne({email:req.body.email},(err,user)=>{
        if(user){
            return res.status(400).json({error:"Please enter a unique value for email."})
        }
    })


    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
    
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    //     res.json({error:"Please enter a unique value for email."})
    // })


    // res.send("Hello")
    // res.send(req.body)

})

module.exports = router
