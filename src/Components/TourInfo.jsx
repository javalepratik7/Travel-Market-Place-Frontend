import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import jscookie from "js-cookie";

const BookPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tour } = location.state;

  const handlePaymentSuccess = async (packageDetails) => {

    const cookie = jscookie.get("token");
    const datato = { amount: tour.prise * 100, cookie };
    // const { data } = await axios.post("http://localhost:8080/traveler/payment", datato);
    const { data } = await axios.post("https://travel-z3l6.onrender.com/traveler/payment", datato);

    if (data.message === "please login aa") {
      alert(data.message);
      navigate("/login");
    }

    const options = {
      key: "rzp_test_YvRIHnFAq7vpT2",
      amount: "50000",
      currency: "INR",
      name: "Travel Marketplace",
      description: "Razorpay Integration",
      order_id: data.orderGenerate.id,
      // callback_url: `http://localhost:8080/traveler/applyTour/?tourID=${tour._id}&cookie=${cookie}`,
      callback_url: `https://travel-z3l6.onrender.com/traveler/applyTour/?tourID=${tour._id}&cookie=${cookie}`,
      prefill: {
        name: "Pratik Javale",
        email: "pratikjavale712@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    < >
      <Navbar />
      <div className="bg-[#f8faf0]" >
        <div className="max-w-4xl mx-auto p-4 " >
          <div className="mb-6 overflow-hidden border border-transparent rounded-lg shadow-2xl bg-white">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/2">
                <h1 className="text-5xl font-bold mb-8">{tour.path}</h1>

                <div className="space-y-4 mt-15">
                  <div className="flex">
                    <span className="font-semibold w-32">Company:</span>
                    <span>{tour.companyName}</span>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold block">Duration:</span>
                      <span className="text-xl font-bold">{tour.days} Days</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold block">Price</span>
                      <span className="text-xl font-bold text-orange-500">₹{tour.prise}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold block">Route:</span>
                    <span>{tour.path}</span>
                  </div>
                </div>
              </div>

              <div className="relative md:w-2/3 h-60 md:h-auto">
                <img
                  src={tour.Images}
                  alt="Gateway of India, Mumbai"
                  className="object-cover w-full h-100"
                />
                <button className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 rounded-full h-14 w-14 text-white font-bold">
                  Travel
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 p-6 border border-transparent rounded-lg shadow-2xl bg-white">
            <h2 className="text-2xl font-bold mb-4">Package Details</h2>
            <p className="text-lg">{tour.allInformation}</p>
          </div>

          <div className="flex justify-center">
            <button onClick={() => handlePaymentSuccess(tour)} className="bg-orange-500 hover:bg-orange-600 text-white text-xl py-3 px-8 rounded-full">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPackage;
