import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import {assets} from '../assets/assets'
import { toast } from 'react-toastify';


const Myprofile = () => {
  const {userdata,setuserdata,backendurl,token,loaddata}=useContext(AppContext)
  const [edit,setedit]=useState(true);
  const [image,setimage]=useState(false);

  const updatedata=async ()=>{
      try {
        const formdata=new FormData();
        formdata.append('name',userdata.name);
        formdata.append('phone',userdata.phone);
        formdata.append('address',(JSON.stringify(userdata.address)));
        formdata.append('gender',userdata.gender);
        formdata.append('dob',userdata.dob);

        image&&formdata.append('image',image);

        const {data}=await axios.post(backendurl+'/api/user/updateprofile',formdata,{headers:{token}})

        if(data.success){
          toast.success(data.message);
          await loaddata();
          setedit(false);
          setedit(false);
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
  }



  return userdata &&(
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">

        {
          edit?
          <label htmlFor="image">

            <div className='inline-block cursor-pointer relative'>
              <img className='w-36 rounded opacity-75' src={image?URL.createObjectURL(image):userdata.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image?'':assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setimage(e.target.files[0])} type="file"  id="image" hidden />
          </label>: <img className='w-36 rounded' src={userdata.image} alt="" />
          
        }


     
      {
        edit?
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userdata.name} onChange={(e) => setuserdata((prev) => ({ ...prev, name: e.target.value }))}
        />: <p className='font-medium text-3xl text-neutral-600 mt-4'>{userdata.name}</p>
      }
      <hr className='bg-zinc-800 h-[1px] border-none'/>
      <div >
          <p className='text-neutral-500 underline mt-3'>Contact Info</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500'>
            <p className='font-medium'>email:</p>
            <p className='text-blue-400'>{userdata.email}</p>
            <p className='font-medium'>Phone</p>
            <p>
            {
        edit?
        <input className='bg-gray-100 max-w-50' type="text" value={userdata.phone} onChange={(e) => setuserdata((prev) => ({ ...prev, phone: e.target.value }))}
        />: <p className='text-blue-400 '>{userdata.phone}</p>
      }
            </p>
            <p className='font-medium'>Adress:</p>
          
          {
            edit?
            <p>
            <input className='bg-gray-100' type="text" value={userdata.address.line1} onChange={(e) => setuserdata((prev) => ({ ...prev, address:{...prev.address,line1: e.target.value }}))}
        />
        <br />
        <input className='bg-gray-100' type="text" value={userdata.address.line2} onChange={(e) => setuserdata((prev) => ({ ...prev, address:{...prev.address,line2: e.target.value }}))}
        />
        </p>

        : <p className='text-gray-500'>
          {userdata.address.line1}
          <br />
          {userdata.address.line2}
        </p>

          }

          </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>
        BASIC INFORMATION
        </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500'>
        <p className='font-medium'>
          gender:
        </p>
        {
        edit?<select className='max-w-20 bg-gray-50' onChange={(e) => setuserdata((prev) => ({ ...prev, gender: e.target.value }))} value={userdata.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
       : <p className='text-gray-400'>{userdata.gender}</p>
       }
          <p className='font-medium'>
            Birthday
          </p>
        {
          edit?
          <input className='max-w-28 bg-gray-50' type="date"  onChange={(e) => setuserdata((prev) => ({ ...prev, dob: e.target.value }))} value={userdata.dob}/>:
          <p className='text-gray-400'>{userdata.dob}</p>
        }
        </div>

      </div>

      <div className='mt-10'>
        {
          edit?
          <button className=' border rounded-full border-primary px-8 py-2 hover:bg-primary hover:text-white transition-all'  onClick={updatedata} > Save Info</button>:
          <button className=' border rounded-full border-primary px-8 py-2  hover:bg-primary hover:text-white transition-all'  onClick={()=>setedit(true)} >Edit</button>
        }
      </div>
    </div>
  )
}

export default Myprofile