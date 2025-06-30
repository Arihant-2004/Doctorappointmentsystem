import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Myprofile = () => {
  const { userdata, setuserdata, backendurl, token, loaddata } = useContext(AppContext);
  const [edit, setedit] = useState(true);
  const [image, setimage] = useState(false);

  const updatedata = async () => {
    try {
      const formdata = new FormData();
      formdata.append('name', userdata.name);
      formdata.append('phone', userdata.phone);
      formdata.append('address', JSON.stringify(userdata.address));
      formdata.append('gender', userdata.gender);
      formdata.append('dob', userdata.dob);
      if (image) formdata.append('image', image);

      const { data } = await axios.post(`${backendurl}/api/user/updateprofile`, formdata, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loaddata();
        setedit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userdata && (
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg mt-10 text-sm text-zinc-700 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <label htmlFor="image" className="relative cursor-pointer group">
            <img
              className="w-32 h-32 object-cover rounded-full border shadow"
              src={image ? URL.createObjectURL(image) : userdata.image}
              alt="Profile"
            />
            {edit && (
              <>
                <input
                  onChange={(e) => setimage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow group-hover:scale-105 transition">
                  <img src={assets.upload_icon} className="w-6" alt="Upload" />
                </div>
              </>
            )}
          </label>
          <div className="flex-1">
            {edit ? (
              <input
                className="text-2xl font-semibold w-full border-b border-zinc-300 focus:outline-none focus:border-primary"
                type="text"
                value={userdata.name}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-2xl font-semibold">{userdata.name}</h2>
            )}
            <p className="text-zinc-500">{userdata.email}</p>
          </div>
        </div>

        <hr />

        <div>
          <h3 className="text-sm text-zinc-500 font-semibold uppercase">Contact Information</h3>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-xs text-zinc-400">Phone</label>
              {edit ? (
                <input
                  className="w-full border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  type="text"
                  value={userdata.phone}
                  onChange={(e) =>
                    setuserdata((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-500">{userdata.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-xs text-zinc-400">Gender</label>
              {edit ? (
                <select
                  className="w-full border border-zinc-200 rounded px-3 py-2 bg-white focus:outline-none focus:border-primary"
                  onChange={(e) =>
                    setuserdata((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userdata.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-zinc-600">{userdata.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-xs text-zinc-400">Date of Birth</label>
              {edit ? (
                <input
                  className="w-full border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  type="date"
                  value={userdata.dob}
                  onChange={(e) =>
                    setuserdata((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-zinc-600">{userdata.dob}</p>
              )}
            </div>
            <div>
              <label className="block text-xs text-zinc-400">Address</label>
              {edit ? (
                <div className="space-y-2">
                  <input
                    className="w-full border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:border-primary"
                    type="text"
                    value={userdata.address.line1}
                    placeholder="Line 1"
                    onChange={(e) =>
                      setuserdata((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="w-full border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:border-primary"
                    type="text"
                    value={userdata.address.line2}
                    placeholder="Line 2"
                    onChange={(e) =>
                      setuserdata((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-zinc-600">
                  {userdata.address.line1}
                  <br />
                  {userdata.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-right mt-6">
          {edit ? (
            <button
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
              onClick={updatedata}
            >
              Save Info
            </button>
          ) : (
            <button
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
              onClick={() => setedit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Myprofile;
