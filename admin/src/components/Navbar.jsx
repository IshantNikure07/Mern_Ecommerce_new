import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
    <div className='w-20 ml-2 sm:h-3 sm:w-28 sm:ml-4 flex pt-2  justify-center items-center'><img src={"https://images-platform.99static.com//86MQ5CxBQt5IF_IGOnqHslStjgQ=/161x0:840x679/fit-in/500x500/99designs-contests-attachments/99/99203/attachment_99203419"} /> <p className='font-serif text-xl sm:text-2xl'>BEclassy</p></div>
      <button onClick={()=>settoken('')}  className='bg-gray-900 text-white px-5 py-2 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
