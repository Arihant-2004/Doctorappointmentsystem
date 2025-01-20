
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const Navigate=useNavigate();
  return (
    <div className=' flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 '>
        <div className='flex-1 py-8 sm:py-10 md:py-12 lg:py-14 lg:pl-5'>
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointment</p>
           
            <p className='mt-4'>With 100+ Trusted Doctors</p>
            
          </div>
          <button onClick={()=>{Navigate('/login');scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-500 px-8 py-3 rounded-full hover:scale-105 transition-all mt-6'>Create Account</button>
        </div>

        <div className='hidden md:block md:w-2/5 lg:w-[230px] relative'>
          <img className='absolute bottom-0 right-0 w-full max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  );
};

export default Banner;
