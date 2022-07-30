const express=require('express');
const {validationresult}=require('express-validator');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose')
const User= require('../model/users');

module.exports=(req,res,next)=>{
    console.log('auth')
    const authheader=req.body.headers.authorization;
    console.log(req.body.headers.authorization)
    if(!authheader){
        const err=new Error('Not Authenticated');
        throw err;
    }
    
    const token=authheader.split(' ')[1];
    let decodetoken;
    try {
        decodetoken=jwt.verify(token,'orgoisthefreelancingcompany');   
    } catch (error) {
        console.log(error);
    }
 
    const {userId}=decodetoken;
    console.log(userId)
    User.findOne({_id:mongoose.Types.ObjectId(userId)})
    .then((user)=>{
        console.log(user)
        if(user){
            console.log('user')
            console.log(req.file)
            req.user=user;
            next();
        }else{
            res.status(400).json({flag:'false',msg:'Not a valid token'})
        }

    }).catch(err=>{
        console.log(err);
    })
}