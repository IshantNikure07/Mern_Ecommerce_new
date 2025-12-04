import express from 'express'
import  {placeOrderCod ,placeOrderRazorpay , placeOrderStripe , allOrders , userOrders, updateStatus} from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

// admin featutrs
orderRouter.post('/list'  ,adminAuth , allOrders)
orderRouter.post('/status'  ,adminAuth , updateStatus)

// payment features
orderRouter.post('/place'  ,authUser, placeOrderCod)
orderRouter.post('/razorpay' ,authUser, placeOrderRazorpay)
orderRouter.post('/stripe',authUser  , placeOrderStripe)


orderRouter.post('/userorders' , authUser , userOrders)

export default orderRouter