import { createContext } from "react";

export const AppContext=createContext();
import {toast} from 'react-toastify'
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
const AppContextProvider=(props)=>{
    const currencysymbol="$";
    const [userdata,setuserdata]=useState(false)
    const [doctors,setdoctors]=useState([])
    const backendurl=import.meta.env.VITE_BACKEND_URL;
    const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
        const getdoctordata=async(req,res)=>{
                console.log(backendurl+'/api/doctor/list')
            try {
                
                const {data}=await axios.get(backendurl+'/api/doctor/list');
                 console.log(data);
                    if(data.success){
                        setdoctors(data.doctors)
                    }else{
                        toast.error(data.message)
                    }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
           const loaddata=async(req,res)=>{
               try {
                const {data}=await axios.get(backendurl+'/api/user/getprofile',{headers:{token}});

               if(data.success){
                   setuserdata(data.userdata)
               }else{
                  toast.error(data.message)
               }
               } catch (error) {
                console.log(error);
                toast.error(error.message)
               }
           }

        useEffect(()=>{
            getdoctordata()
    },[])
    useEffect(()=>{
        if(token)
        {
            loaddata();
        }else{
            setuserdata(false)
        }
},[token])

        const value={
            doctors,currencysymbol,token,settoken,backendurl,userdata,setuserdata,loaddata,getdoctordata
        }
        
        return (
        <AppContext.Provider value={value}>
            {props.children}
            </AppContext.Provider>
        )

}
export default AppContextProvider