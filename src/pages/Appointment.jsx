import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencysymbol, backendurl, token, getdoctordata } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [docinfo, setdocinfo] = useState(null);
  const [docslots, setdocslot] = useState([]);
  const [slottime, setslottime] = useState("");
  const [slotindex, setslotindex] = useState(0);

  const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const availableslot = async () => {
    setdocslot([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate() + i);

      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentdate.getDate()) {
        currentdate.setHours(
          currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10
        );
        currentdate.setMinutes(currentdate.setMinutes() > 30 ? 30 : 0);
      } else {
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }
      let timeslot = [];
      while (currentdate < endtime) {
        let date = currentdate;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let formattime = currentdate.toLocaleDateString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        //add slot
        const slotdate = day + "_" + month + "_" + year;
        const slottime = formattime;
        const slots =
          docinfo.slot_booked[slotdate] &&
          docinfo.slot_booked[slotdate].includes(slottime)
            ? false
            : true;
        if (slots) {
          timeslot.push({
            datetime: new Date(currentdate),
            time: formattime,
          });
        }
        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }
      setdocslot((prev) => [...prev, timeslot]);
    }
  };

  const applyfilter = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setdocinfo(docInfo);
  };

  const bookappoint = async () => {
    if (!token) {
      toast.warn("first login and then come");
      navigate("/login");
    }
    try {
      console.log(docslots);
      const date = docslots[slotindex][1].datetime;
      console.log(date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotdate = day + "_" + month + "_" + year;
      console.log({ docId, slotdate, slottime });
      const { data } = await axios.post(
        backendurl + "/api/user/bookappoint",
        { docId, slotdate, slottime },
        { headers: { token } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        getdoctordata();
        navigate("/Myappointment");
      } else {
        console.log("yaha pa");
        toast.error(data.message);
      }
    } catch (error) {
      console.log("nahi aaya");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    availableslot();
  }, [docinfo]);

  useEffect(() => {
    applyfilter();
  }, [doctors, docId]);

  useEffect(() => {
    // console.log(docslots)
  }, [docslots]);

  return (
    docinfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-blue-500" src={docinfo.image} alt="" />
          </div>
          <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {docinfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {docinfo.degree} - {docinfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                7 Year
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                About
                <img className="w-3" src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {docinfo.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currencysymbol}
                {docinfo.fee}
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
          <p>Booking slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docslots.length &&
              docslots.map((item, index) => (
                <div
                  onClick={() => setslotindex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotindex === index
                      ? " bg-primary text-white "
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && days[item[0].datetime.getDay()]}</p>
                  <p> {item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-auto scroll mt-5">
            {docslots.length &&
              docslots[slotindex].map((item, index) => (
                <p
                  onClick={() => setslottime(item.time)}
                  key={index}
                  className={`text-sm cursor-pointer font-light flex-shrink-0 py-2 rounded-full px-5 ${
                    item.time === slottime
                      ? " bg-primary text-white "
                      : "border border-gray-200 text-gray-400"
                  }`}
                >
                  {console.log(item[0])}
                  {new Date(item.datetime)
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookappoint}
            className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docinfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
