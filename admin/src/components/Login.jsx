import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Login = ({settoken}) => {
      const [email , setemail] = useState('')
      const [password , setpassword] = useState('')

      const onSubmitHandler=async(e)=>{
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin' , {email,password} )
           if (response.data.success) {
               settoken(response.data.token)
           }else{
            toast.error(response.data.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
      }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
      <div className=' border px-4 py-6 shadow-sm rounded-md bg-stone-50 flex flex-col gap-3 h-[45%] w-[25%]'>
        <div  className='space-y-6'>
            <h1 className='text-2xl'>ADMIN   PANEL</h1>
            <form onSubmit={onSubmitHandler}  className='space-y-4' action="">
                <div className='flex flex-col gap-1'> 
                    <p className='text-sm'>Email </p>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='border py-1 rounded-sm' type="email" placeholder='Enter your email' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-sm'>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border py-1 rounded-sm' type="password" placeholder='Enter your password' />
                </div>
                <button  className='bg-black rounded-md my-4 text-white w-full flex justify-center items-center py-1'>Login</button>
              
            </form>
        </div>
        
      </div>

    </div>
  )
}

export default Login
