import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SendOTP() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      alert("Please enter an email!");
      return;
    }

    try {
      // const response = await axios.post("http://localhost:8080/user/sendOtp", { email });
      const response = await axios.post("https://travel-z3l6.onrender.com/user/sendOtp", { email });
      alert(response.data.message);
      navigate("/forgetPassword");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#f8faf0] h-screen">
        <div className="pb-20"></div>
        <div className="max-w-md mx-auto  p-6  text-center border border-gray-300 rounded-lg shadow-2xl bg-white">
          <h2 className="text-2xl font-bold mb-4">Send OTP</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendOTP}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Send OTP
          </button>
          {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        </div>
      </div>
    </>
  );
}
