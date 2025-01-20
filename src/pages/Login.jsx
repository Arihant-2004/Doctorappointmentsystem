import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
export const Login = () => {
  const [state,setstate]=useState('Sign Up');
  const {token,settoken,backendurl}=useContext(AppContext);
  const [password,setpassword]=useState('')
  const [email,setemail]=useState('')
  const [name,setname]=useState('')
  const navigate=useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
  
   try {
      if(state==='Sign Up'){
        console.log(name,email,password);
         const {data}=await axios.post(backendurl+'/api/user/userdata',{name,password,email},{headers:{token}});
         console.log(data)
       if(data.success){
          localStorage.setItem('token',data.token);
          settoken(data.token)
       }else{
          toast.error(data.message)
       }
      }else{
        
          const {data}=await axios.post(backendurl+'/api/user/login',{password,email},{headers:{token}});
          console.log(data);
        if(data.success){
           localStorage.setItem('token',data.token);
           settoken(data.token)
        }else{
           toast.error(data.message)
        }
       }
      } catch (error) {
        toast.error(error.message)
   }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg text-sm'>
        
      <p className='text-2xl font-semibold'>{state=='Sign Up'?'Crete Account':"Login"}</p>
      <p>Please {state=='Sign Up'?'Sign Up':"log in"} to book appointment</p>
      
      {
        state==='Sign Up'&&
        <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="text" onChange={(e) => setname(e.target.value)}  value={name} required/>
      </div>
      }
      <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="email"  onChange={(e)=>setemail(e.target.value)}  value={email}  required/>
      </div>
      <div className='w-full'> 
        <p>Password</p>
        <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="password"  onChange={(e)=>setpassword(e.target.value)} value={password} required/>
      </div>
      <button type='submit' className='bg-primary w-full border rounded-full mt-2 h-10 text-white'>{state=='Sign Up'?'Crete Account':"Login"}</button>
      {state=='Sign Up'?<p>Already have an account? <span onClick={()=>setstate('Login')} className='text-blue-600 underline cursor-pointer'>Login here</span>
                        </p>:<p>Create an new account? <span onClick={()=>setstate('Sign Up')} className='text-blue-600 underline cursor-pointer'>Click here</span></p>}
      </div>
    </form>
  )
}
export default Login