import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { useContext } from "react";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
console.log(doctors)
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((items, index) => (
          <div
          onClick={() => {navigate(`/Appointment/${items._id}`),scrollTo(0,0)}}
            key={index}
            className="border-blue-200 border rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-13px] transition-all duration-300"
          >
            <img className="bg-blue-50" src={items.image} alt="" />
            <div>
              <div className={`flex items-center gap-2 text-sm text-center ${items.available?"text-green-700":"text-red-700"}`}>
             <p className={`w-2 h-2 rounded-full ${items.available?"bg-green-700":"bg-red-700"} `}></p> 
                <p>{items.available?'Available':'Not available'}</p>
              </div>

              <p className="text-lg">{items.name}</p>
              <p className="text-gray-800">{items.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
        >
          more
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
