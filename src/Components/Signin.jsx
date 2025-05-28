import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import React, { useState } from 'react';
import axios from 'axios';

function Signin() {
  const navigation=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    role: 'user',
    companyName: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function registration() {
    try {
      // const response = await axios.post("http://localhost:8080/user/signin/", formData);
      const response = await axios.post("https://travel-z3l6.onrender.com/user/signin/", formData);
      alert(response.data.message);
      navigation("/login")
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r flex flex-col items-center justify-center py-10 px-4 bg-[#f8faf0]">
        <h1 className=" text-4xl font-bold mb-4">Let's Explore the World Together!</h1>
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Registration Form</h2>

          <div className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />

            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="user">Traveler</option>
              <option value="agent">Agent</option>
            </select>

            {formData.role === 'agent' && (
              <>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </>
            )}
          </div>

          <button onClick={registration} className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">Register</button>

          <p className="text-center text-gray-600 mt-4">Already have an account? <NavLink to='/login' className="text-blue-500 hover:underline">Login</NavLink></p>
        </div>
      </div>
    </>
  );
}

export default Signin;