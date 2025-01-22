import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showmenu, setshowmenu] = useState(false);
  const { token, settoken, userdata } = useContext(AppContext);
  const logout = () => {
    settoken(false);
    localStorage.removeItem(token);
  };
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <ul className="hidden md:flex items-start gap-8 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About us</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        {token && (
          <NavLink to="https://doctorappointmentadmin.vercel.app/" target="_blank">
            <li className=" bg-blue-500 text-white px-4 py-2 rounded-md">
              Admin Panel
            </li>
          </NavLink>
        )}
      </ul>
      <div className="flex item-center gap-4">
        {token && userdata ? (
          <div className="flex item-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userdata.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/Myprofile")}
                  className="hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/Myappointment")}
                  className="hover:text-black"
                >
                  My Appointment
                </p>
                <p onClick={logout} className="hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-4 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setshowmenu(true)}
          className="md:hidden w-6"
          src={assets.menu_icon}
          alt=""
        />
        <div
          className={` ${
            showmenu ? "w-full fixed" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="h-9 w-36" src={assets.logo} alt="" />
            <img
              className="w-9"
              onClick={() => setshowmenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center mt-5 gap-2 px-5 text-lg">
            <NavLink onClick={() => setshowmenu(false)} to="/">
              <p className="px-2 py-4 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setshowmenu(false)} to="/doctors">
              <p className="px-2 py-4 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setshowmenu(false)} to="/about">
              <p className="px-2 py-4 rounded inline-block">About Us</p>
            </NavLink>
            <NavLink
              className="px-2 py-4 rounded inline-block"
              onClick={() => setshowmenu(false)}
              to="/contact"
            >
              <p className="px-2 py-4 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
