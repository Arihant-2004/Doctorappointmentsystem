import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Myappointment = () => {
  const {backendurl,token,getdoctordata}=useContext(AppContext);
  const [appoint,setappoint]=useState([]);
  const navigate=useNavigate();
  const phone="9601334913";
   const getuserappoint=async()=>{
    try {
      const {data}=await axios.get(backendurl+'/api/user/myappointment',{headers:{token}});
      console.log(data);
      if(data.success){
          setappoint(data.data.reverse());
      }
    } catch (error) {
      toast.error(error.message)
    }
   }
   const initpay=async(order)=>{
      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:"Appointment Payment",
        description:"Appointment Payment",
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
            console.log(response)

            try {
              const {data}=await axios.post(backendurl+'/api/user/payment-verify',{response,phone},{headers:{token}});
              if(data.success){
                getuserappoint()
                navigate('/Myappointment')
                toast.success(data.message);
              }else{
                toast.error(data.message)
              }
            } catch (error) {
              toast.error(error.message);
            }
        }
      }
      const rzp=new window.Razorpay(options)
      rzp.open()
   }
   const paymennt=async(appointmentId)=>{
      try {
        const {data}=await axios.post(backendurl+'/api/user/payment',{appointmentId},{headers:{token}});
        console.log(data);
        if(data.success){
          initpay(data.order)
        }
      } catch (error) {
        console.log(error.message)
      }
   }

   const cancelappoint=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendurl+'/api/user/cancelappoint',{appointmentId},{headers:{token}});

    if(data.success){
        toast.success(data.message)
        getuserappoint();
        getdoctordata();
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
    

   }

useEffect(()=>{
    if(token){
      getuserappoint();
    }
},[token])
  
  return (
    <div>
          <p className='pb-3 mt-12 font-medium text-gray-500 border-b'>
          My appointments
          </p>

            <div>
                  {
                    appoint.slice(0,5).map((items,index)=>(
                        <div className= 'grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
                          <div>
                            <img className='w-32 bg-indigo-50' src={items.docData.image} alt="" />
                          </div>

                          <div className='flex-1 text-sm text-zinc-500'>
                            <p className='text-neutral-800 font-semibold' >{items.docData.name}</p>
                            <p>{items.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                            <p className='text-xs'>{items.docData.address.line1}</p>
                            <p className='text-xs'>{items.docData.address.line2}</p>
                            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date &Time:</span> {items.slotDate}|{items.slotTime}</p>
                          </div>
                          <div></div>
                          <div className='flex flex-col gap-2 justify-end'>
                            {!items.cancelled&&items.payment&&!items.isComplete&& <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 '>Paid</button>}
                            {!items.cancelled&&!items.payment&&!items.isComplete&&<button onClick={()=>paymennt(items._id)} className='py-2 sm:min-w-48 border-x-zinc-500 text-sm text-stone-500 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                            {!items.cancelled&&!items.isComplete&& <button onClick={()=>cancelappoint(items._id)} className='py-2 sm:min-w-48 border-x-zinc-500 text-sm text-stone-500 border rounded hover:bg-red-600 hover:text-white v'>Cancel Appointment</button>}
                            {items.cancelled&&!items.isComplete&&<button className='sm-min-w-48 py-2 px-6  border-red-500 border rounded text-red-500'>appointment cancel</button>}
                            {items.isComplete&&<button className='sm-min-w-48 py-2 px-6  border-green-500 border rounded text-green-500'>complete meeet hogai</button>}
                          </div>
                        </div>
                    )
                  )
                  }
            </div>

          </div>
   
  )
}

export default Myappointment