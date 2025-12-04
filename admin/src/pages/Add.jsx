import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({token}) => {
   const [image , setImage] = useState(false)
   const [name , setName] = useState("")
   const [description , setDescription] = useState("")
   const [category , setCategory] = useState("Men")
   const [subcategory , setSubcategory] = useState("Topwear")
   const [price, setPrice] = useState("")
   const [size, setSize] = useState([])
   const [bestseller, setBestseller] = useState(false)

   const onSubmitHandler = async (e) =>{
    e.preventDefault()
       try {
        const formData = new FormData()
        formData.append("name" , name)
        formData.append("description" , description)
        formData.append("price" , price)
        formData.append("category" , category)
        formData.append("subCategory" , subcategory)
        formData.append("bestseller" , bestseller)
        formData.append("sizes" , JSON.stringify(size))
        
        image && formData.append("image" , image)
        
        if (!image) {
          toast.error("please add image")
        }else{
          const responce = await axios.post(backendUrl + "/api/product/add" , formData , {headers:{token}})
          if (responce.data.success ) {
            toast.success(responce.data.message)
            setImage(false)
            setName('')
            setDescription('A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.')
            setPrice('')
            setBestseller(false)
            setSize([])
          }
           else{
            toast.error(responce.data.message)
           }
          }
        
        
        
       } catch (error) {
        console.log(error)
        toast.error(error.message)
       }

   }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className='sm:w-[50%] w-full  '>
          <p className='mb-2'>Upload Image</p>
          <div>
            <label htmlFor="image">
              <img className='w-20' src={!image ?assets.upload_area :URL.createObjectURL(image)} alt="" />
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          </div>
          <div className='mt-7 w-full'>
          <p>Product name</p>
          <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full max-w-[550px] px-3 py-1 border ' type="text" placeholder='Type here' id="" />
          </div>

          <div className='mt-2 w-full'>
          <p>Product description</p>
          <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[550px] px-3 py-1 border ' type="text" placeholder='Write content here' id="" />
          </div>

          <div className='flex flex-col sm:flex-row gap-2 sm:gap-1'>
            <div>
              <p>Category</p>
              <select onChange={(e)=> setCategory(e.target.value)}  className='border w-full   py-1 '>
                <option className='text-' value="Men">Men   </option>
                <option className='text-sm' value="Women">Women</option>
                <option className='text-sm' value="Kids">Kids  </option>
              </select>
            </div>

            <div>
              <p>Sub category</p>
              <select  onChange={(e)=> setSubcategory(e.target.value)}  className='border w-full px-3 py-1'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>

            <p>Price</p>
           <input  onChange={(e)=> setPrice(e.target.value)} value={price}  className='w-full  px-3 py-1 border ' type="number" placeholder='Type here' id="" />
            </div>

          </div>

         <div className='mt-3'>
            <p className='mb-2'>Product sizes</p>
            <div className='flex gap-3'>
              <div  onClick={()=> setSize(prev =>prev.includes("S") ? prev.filter( item => item !== "S") : [...prev , "S"])}  >
                <p className={` ${size.includes("S") ? "border border-black" : ""} bg-slate-200 px-3 py-1`}>S</p>
              </div>
              <div onClick={()=> setSize(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev ,"M"])} >
              <p className={` ${size.includes("M") ? "border border-black" : ""} bg-slate-200 px-3 py-1`}>M</p>
              </div>
              <div onClick={()=> setSize(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev , "L"])} >
              <p className={` ${size.includes("L") ? "border border-black" : ""} bg-slate-200 px-3 py-1`}>L</p>
              </div>
              <div onClick={()=> setSize(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev , "XL"])} >
              <p className={` ${size.includes("XL") ? "border border-black" : ""} bg-slate-200 px-3 py-1`}>XL</p>
              </div>
              <div onClick={()=> setSize(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev , "XXL"])} >
              <p className={` ${size.includes("XXL") ? "border border-black" : ""} bg-slate-200 px-3 py-1`}>XXL</p>
              </div>
            </div>
         </div>

         <div className='flex gap-2 mt-2'>
          <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type="checkbox"  id="bestseller" />
          <label  className='cursor-pointer' htmlFor="bestseller"> Add to bestseller</label>
         </div>

         <button type="submit" className='w-28 rounded-md py-2 mt-4 bg-black text-white'>ADD</button>
      </div>
    </form>
  )
}

export default Add
