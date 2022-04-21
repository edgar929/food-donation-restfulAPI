//import cloudinary
import cloudinary from 'cloudinary';
import User from '../model/userModel'
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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

 exports.updateProfilePicture = async(req,res)=>{
  try {
        const file = req.files.picture;
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath);
        const user = await User.findById(req.user._id);
        user.profilePicture = result.secure_url;
        await user.save();
        res.send({message:"profile picture updated successfully"})
  } catch (error) {
      res.status(400).send(error.message)
  }
  }
 