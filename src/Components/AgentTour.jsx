import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import Cookie from "js-cookie";
import Navbar from "./Navbar";
import { useAppSelector } from "../../Redux/hooks";
import { useNavigate } from 'react-router-dom';


const AgentTour = () => {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [transportType, setTransportType] = useState('car')
  const navigate = useNavigate();
  const counter = useAppSelector((state) => state.auth);


  useEffect(() => {
    console.log(counter.isAuthenticate);
    if (counter.isAuthenticate == false) {
      alert("This page is only for agents")
      navigate("/login")
    }
  }, [])

  const whenGo = watch("whenGo");
  const days = watch("days");

  // Calculate return date
  let returnDate = "";
  if (whenGo && days) {
    const depDate = new Date(whenGo);
    depDate.setDate(depDate.getDate() + Number(days));
    returnDate = depDate.toISOString().split("T")[0];
  }

  const onSubmit = async (data) => {
    const token = Cookie.get("token");
    const img = document.getElementById("img").files[0];

    data = { ...data, transportType: transportType, cookie: token, Images: img,whenCome:returnDate }

    try {
      // const response = await axios.post("http://localhost:8080/agent/tour/", data, {
      const response = await axios.post("https://travel-z3l6.onrender.com/agent/tour/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      alert(response.data.error);
    } catch (err) {
      console.log(err)
      alert("Submission failed. Please try again.", err.message);
    }
  };

  return (
    <>
      <Navbar role={"agent"} />
      <div className="min-h-screen   flex flex-col items-center py-10 bg-[#f8faf0]" >
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Submit Your Travel Package</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-600">Path</label>
              <input id='path' {...register("path", { required: true })} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.path && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div>
              <label className="block text-gray-600">All Information</label>
              <input id='allInformation' {...register("allInformation", { required: true })} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>



            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Cover Image</label>
                <input type='file' id='img' {...register("Images", { required: true })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-600">Price</label>
                <input id='price' {...register("prise", { required: true })} type="number" className="w-full p-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Transport Type</label>
                <select
                  className="w-full p-2 border rounded"
                  // value={selectedTransport}
                  onChange={(e) => setTransportType(e.target.value)}
                >
                  <option value="car">Car</option>
                  <option value="train">Train</option>
                  <option value="plane">Plane</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600">No of Seats</label>
                <input id='seats' {...register("seats", { required: true })} type="number" className="w-full p-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Number of Days</label>
                <input id='days' {...register("days", { required: true, min: 1 })} type="number" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-600">PickUp Location</label>
                <input id='returnDate' {...register("pickupPoint", { required: true })} type="text" className="w-full p-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Departure Date</label>
                <input
                  id="DepartureDate"
                  type="date"
                  className="w-full p-2 border rounded"
                  min={new Date().toISOString().split("T")[0]} 
                  {...register("whenGo", {
                    required: "Departure date is required",
                    validate: (value) => {
                      const today = new Date().setHours(0, 0, 0, 0);
                      const selectedDate = new Date(value).setHours(0, 0, 0, 0);
                      return selectedDate >= today || "Departure date cannot be in the past";
                    },
                  })}
                />
              </div>

              <div>
                <label className="block text-gray-600">Return Date</label>
                <input
                  id="returnDate"
                  type="date"
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                  value={returnDate}
                  readOnly
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-2 rounded transition" disabled={isSubmitting}>
              {isSubmitting ? "Submitting" : " Submit Package"}
            </button>
          </form>
        </motion.div>
        <footer className="mt-6 text-gray-500 text-sm">&copy; 2025 Travel Marketplace. All rights reserved.</footer>
      </div>
    </>
  );
};

export default AgentTour;
