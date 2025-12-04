import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list , setlist] = useState([])

  const fetchList = async () => {
    try {

      const responce = await axios.get(backendUrl + '/api/product/list')
      if (responce.data.success) {
        setlist(responce.data.products)
      }
      else{
        toast.error(responce.data.message)
      }
      
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error(error.message)
    }
  }

  const removeProduct =async (id)=>{
     try {
       const responce =await axios.post(backendUrl + "/api/product/remove" , {id } , {headers:{token}}) 
       if (responce.data.success) {
        console.log(responce.data.success)
        await fetchList()
        toast.success(responce.data.message)
       }else{
        toast.error(responce.data.message)
       }
      
     } catch (error) {
      console.error("Error removing in list", error);
      toast.error(error.message)
     }
  }

  useEffect(() => {
    fetchList()
  },[])

  return (
    <>
        <p className='text-xl sm:text-2xl p-2 mb-2'>Items List</p>
         {/*------------------ list table--------- */}

         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm  '>
               <b>Image</b>
               <b>Name</b>
               <b>Category</b>
               <b>price</b>
               <b className='text-center'>Action</b>
         </div>

         {/* --------------------product list-------------------------- */}

        { list.map((item,index)=>(
        <div key={index} className='w-full h-20 border mt-3 md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center   justify-center object-cover'>
             <img src={item.image[0]} className='w-16 h-16 object-cover m-1  ' alt="" />
             <p>{item.name}</p>
             <h1>{item.category}</h1>
             <p>{currency}{item.price}</p>
             <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
         </div>
      
      )) }
    </>
  )
}

export default List
