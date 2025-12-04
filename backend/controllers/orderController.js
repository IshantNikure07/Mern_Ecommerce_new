import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


// COD method
const placeOrderCod = async(req , res)=>{
try {
    
    
    const {userId , items , amount , address } =req.body
     
    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:'cod',
        payment:'false',
        date:Date.now()
    }
    const newOrder = orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId , {cartData:{}})

    res.json({ success:true , message:"Order placed"})
    
} catch (error) {
    console.log(error)
    res.json({message:error.message , success:false})
}
}

// Razorpay method
const placeOrderRazorpay = async(req , res)=>{

}


// Stripe method
const placeOrderStripe = async(req , res)=>{

}


// All orders  data for admin panel
const allOrders = async(req , res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true , orders})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
    
}


// user orders data for user in frontend
const userOrders = async(req , res)=>{

    try {
         const {userId} = req.body
         const orders = await orderModel.find({userId})
         res.json({success:true , orders})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
     
}
// user orders data for user in frontend
const updateStatus = async(req , res)=>{
    try {
        const {orderId , status}= req.body 
        await orderModel.findByIdAndUpdate(orderId , {status} )
        res.json({success:true , message:"status updated"})
      } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
      }
}

export {placeOrderCod ,placeOrderRazorpay , placeOrderStripe , allOrders , userOrders , updateStatus}