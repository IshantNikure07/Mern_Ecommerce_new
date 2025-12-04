import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


const addProduct = async(req , res)=>{
try {
    const {name , description , price , category , subCategory , bestseller , sizes} = req.body

    const image = req.files.image && req.files.image[0]

    const images = [image].filter((item)=> item !== undefined)
    let imageUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )
    
    const productData = {
        name,
        description,
        price:Number(price),
        image:imageUrl,
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller === "true" ? true : false ,
        date: Date.now()
    }
    const product = new productModel(productData)
    await product.save()
    res.json({success: true , message:"product added"})

    // console.log(name,description,price,category,subCategory , bestseller , sizes)
    // console.log(imageUrl)

    // res.json({})
} catch (error) {
    console.log(error)
    res.json({success:false , message:error.message})
}
}


// REMOVE PRODUCT
const removeProduct = async(req , res)=>{

    try {
        await productModel.findOneAndDelete(req.body._id)
        res.json({success:true , message:"product is removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
   
}


// LIST PRODUCT
const listProduct = async(req , res)=>{
  try {
    const products = await productModel.find({})
    res.json({success:true , message:"items are given below" , products})
  } catch (error) {
    console.log(error)
    res.json({success:false , message:error.message})
  }

  
}


// SINGLE PRODUCT 
const singleProduct = async(req , res)=>{
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({msg:"working" , product})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

export {addProduct , removeProduct , listProduct , singleProduct}