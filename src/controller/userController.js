import jwt from 'jsonwebtoken'
import User from '../model/userModel'
require("dotenv").config();

//create user

exports.createUser = async(req,res)=>{
    const user = new User({
       ...req.body
    })
    try {
       const data = await user.save()
       const token = await user.generateAuthToken()
       res.send({
           message:"created successfully",
           user: data,
           token:token
       })
    } catch (error) {
        res.status(400).send(error.message)
    }

}

exports.loginUser = async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
 
        res.send({user, token})
    } catch (error) {
        res.status(404).send({error:"invalid Email or password"})
    }
 }
 
 exports.getUSer = async(req,res)=>{
       res.send(req.user)
 }
 
 exports.logout = async(req,res)=>{
     try {
         req.user.tokens = req.user.tokens.filter((token)=>{
             return token.token !== req.token
         })
         await req.user.save()
         res.send({message:'logged out'})
     } catch (error) {
         res.status(401).send()
     }
 }