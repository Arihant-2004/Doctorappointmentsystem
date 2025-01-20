import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { useEffect } from "react";

const Doctors = () => {
  const {speciality} = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterdoc, setfilterdoc] = useState([]);
  const [showfilter,setshowfilter]=useState(false);
  const applyfilter = () => {
    if (speciality) {
      setfilterdoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterdoc(doctors);
    }
  };
  useEffect(() => {
    applyfilter();
  }, [doctors,speciality]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row mt-5 items-start gap-5">
          <button className={`border rounded sm:hidden text-sm px-3 py-1 w-300 transition all ${showfilter?'bg-primary text-white':''}`}onClick={()=>setshowfilter(prev=>!prev)}>Filters</button>

        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showfilter?'flex':'sm:flex hidden'}`}>
          <p onClick={()=>speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="General physician" ?"bg-indigo-100 text-black":""}`}>
            General physician
          </p>
          <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist" ?"bg-indigo-100 text-black":""}`}>
            Gynecologist
          </p>
          <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Dermatologist" ?"bg-indigo-100 text-black":""}`}>
            Dermatologist
          </p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Pediatricians" ?"bg-indigo-100 text-black":""}`}>
            Pediatricians
          </p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Neurologist" ?"bg-indigo-100 text-black":""}`}>
            Neurologist
          </p>
          <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Gastroenterologist" ?"bg-indigo-100 text-black":""}`}>
            Gastroenterologist
          </p>
        </div>

        <div className="w-full grid-cols-auto grid gap-4 gap-y-6">
          {filterdoc.map((items, index) => (
            <div
              onClick={() => navigate(`/Appointment/${items._id}`)}
              key={index}
              className="border-blue-200 border rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-13px] transition-all duration-300"
            >
              <img className="bg-blue-50" src={items.image} alt="" />
              <div>
                <div className="flex items-center gap-2 text-sm text-center text-green-600">
                  <p className="w-2 h-2 rounded-full bg-green-700"></p>
                  <p>Available</p>
                </div>

                <p className="text-lg">{items.name}</p>
                <p className="text-gray-800">{items.speciality}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>

    </div>
  );
};

export default Doctors;
