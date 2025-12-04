import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { token ,backendUrl , currency } = useContext(ShopContext)

  const [orderData , setorderData] = useState([])
  
  const loadOrderData = async()=>{
    try {
      if (!token) {
        return null
      } 
      const responce = await axios.post(backendUrl + '/api/order/userorders' , {} ,{headers:{token}})
      if (responce.data.success) {
        let allOrdersItem = []

        responce.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status 
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod 
            item['date'] = order.date

            allOrdersItem.push(item)

          })
        })

        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])
  return (<>

    <div className='text-xl my-3'>
      <Title text1={"MY"} text2={"ORDERS"} />
    </div>

    <div>
      {orderData.map((item, index) => (

        <div key={index} className='border-b-2 pb-4 m-3 w-full h-28 flex justify-between'>
          <div className=' h-full flex gap-4'>
            <img className='m-1 sm:w-24 w-12 h-full   ' src={item.image[0]} alt="" />
            <div className='flex flex-col sm:gap-1 '>
              <h1 className='sm:text-base text-xs font-semibold  w-32 sm:w-72' >{item.name}</h1>
              <div className=' gap-4  flex sm:flex-row'>
                <p className='text-green-700'>{currency}{item.price}</p>
                <p className='sm:text-sm text-xs'><span>Quantity </span>{item.quantity}</p>
                <h1 className='bg-slate-300 text-black w-fit px-2 rounded-md'>{item.sizes[0]}</h1>
              </div>
              <h1 className='font-medium sm:text-sm text-xs '>Date:- <span className='font-light text-sm'>{new Date(item.date).toLocaleDateString()}</span></h1>
              <p className='sm:text-sm text-xs'>payment <span>{item.paymentMethod}</span></p>
            </div> 
          </div>
          <div className='flex justify-center items-center max-w-10 sm:max-w-40'>
            <div className='w-2 h-2 bg-green-700 rounded-md'></div>
            <h1 className=' p-1 sm:px-2'>{item.status}</h1>
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={loadOrderData} className='flex justify-center bg-black text-white h-fit w-fit py-0.5 px-2 rounded-md '>track Now
            </button>

          </div>

        </div>

      ))


      }

    </div>

  </>
  )
}

export default Orders
