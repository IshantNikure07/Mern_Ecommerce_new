import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const createToken = (id)=>{
   return jwt.sign({id} , process.env.JWT_SECRET_KEY)
}


// login the user
const loginUser = async(req , res)=>{
 

  try {
    const { email , password} = req.body
    const user = await userModel.findOne({email})

     if (!user) {
      res.json({message:"user not exists" , success:false})
     }
      
     const isMatch = await bcrypt.compare(password , user.password)
     if (isMatch) {
      const token = createToken(user._id)
      res.json({message:"login successs" , success:true, token})
     }
     else{
      res.json({success:false , message:"invalid user"})
     }


  } catch (error) {
   console.log(error)
   res.json({success:false ,message:error.message})
   console.log(req.body)
  }

}

// regsiter the user
const registerUser = async(req , res)=>{
try {
   const {name , password , email} = req.body
   const exists =await userModel.findOne({email})
   // check user exists or not 
   
   if(exists){
      return res.json({success:false , message:"user already exists"})
   }

   if(!validator.isEmail(email)){
      return res.json({success:false , message:"enter a valid email "})
   }

   if (password.length < 8) {
      return res.json({success:false , message:"enter a strong password "})
   }

   // Hashing user
   const salt = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(password , salt)

   const newuser = new userModel({
       name,
       email,
       password:hashedpassword
   })

   const user = await newuser.save()

   const token = createToken(user._id)
   res.json({success:true , token})
   
} catch (error) {
   console.log(error)
   res.json({success:"flase" ,message:error.message})
   console.log(req.body)
}
}


// lgin to admin panel
const adminLogin = async(req , res)=>{
    try {
      const {email , password} = req.body

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         const token = jwt.sign(email+password , process.env.JWT_SECRET_KEY)
         res.send({success:true , token})
      }else{
         res.send({success:false , message:"invalid creadentials"})
      }

    } catch (error) {
      console.log(error)
      res.json({success:false , message:error.message})
    }
}

export {loginUser , registerUser , adminLogin}