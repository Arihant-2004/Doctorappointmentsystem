import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import { Login } from "./pages/Login"
import About from "./pages/About"
import Myappointment from "./pages/Myappointment"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import { Contact } from "./pages/Contact"
import Myprofile from "./pages/Myprofile"
import Footer from "./components/Footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}></Route>
        <Route path="/doctors/:speciality" element={<Doctors/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/Appointment/:docId" element={<Appointment/>}></Route>
        <Route path="/Myprofile" element={<Myprofile/>}></Route>
        <Route path="/Myappointment" element={<Myappointment/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App