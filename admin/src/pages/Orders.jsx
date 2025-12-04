import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { assets } from '../assets/admin_assets/assets';
import { toast } from 'react-toastify';



const Orders = ({token}) => {

  const [orders , setOrders] = useState([])
  const [status , setStatus] = useState(orders.status)

  const fetchAllData = async()=>{
    if (!token) { return null ;}
  
    try {
      const response = await axios.post(backendUrl + '/api/order/list' , {} ,{headers:{token}})
      if (response.data.success) {
        setOrders(response.data.orders)
        
       
      }
     } catch (error) {
      console.log(error)
     }

     console.log(orders)
  }

  const StatusHandle=async(e , orderId)=>{
    
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId , status:e.target.value } , {headers:{token}})
      if (response.data.success) {
        await fetchAllData()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }
 

  useEffect(()=>{
    fetchAllData()
  },[token])

  return (
    <div>
       <h1 className='font-semibold text-2xl '>Orders</h1>

       {orders.map((order , index)=>(
        <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm  '>
          <div className='image'>
              <img src={assets.parcel_icon} alt="" />
          </div>
          <div className=''>
            {order.items.map((item,index)=>(
              <p  key={index}>{item.name} * {item.quantity} {item.size}</p>
            ))}

            <p className='mt-2'>{order.address.firstname} , <span>{order.address.lastname}</span></p>
            <p>{order.address.street}</p>
            <p>{order.address.city} , <span>{order.address.state}</span> , <span>{order.address.country}</span> , <span>{order.address.zipcode}</span></p>
            <p>{order.address.phone}</p>
          </div>
          <div>
                <p>Items : <span>{order.items.length}</span></p>
                <p>Method : <span>{order.paymentMethod}</span></p>
                <p>Payments : <span>{order.payment ? "done" : "pending"}</span></p>
                <p>Date : <span>{new Date(order.date).toLocaleDateString()}</span></p>
          </div>
          <div>
            {currency}{order.amount}
          </div>
          <div>
            <select value={order.status} onChange={(e)=>StatusHandle(e,order._id)} className='w-36' >
              <option value="order placed" > order placed</option>
              <option value="packing">Packing</option>
              <option value="shipped">Shipped</option>
              <option value="out for dilivery">out for delivery</option>
              <option value=" dilivered">Delivered</option>
            </select>
          </div>
        </div>
       ))}
    </div>
  )
}

export default Orders
