import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { logintrue, logout } from '../../Redux/slices/login';

const LoginForm = () => {
  const navigate = useNavigate();
  const counter = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  function loginapi() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const send = { email, password };

    // axios.post('http://localhost:8080/user/login', send)
    axios.post('https://travel-z3l6.onrender.com/user/login', send)
      .then(async (res) => {
        console.log(res.data);
        alert(res.data.message);
        Cookies.set('token', res.data.token);
        const role = res.data.role;
        if (role === 'agent') {
          dispatch(logintrue());
        }
        if (role === 'user') {
          dispatch(logout());
        }
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-164 bg-[#f8faf0] " >
        <h1 className="text-4xl font-bold text-orange-500">Travel Made Easy</h1>
        <h2 className="text-2xl text-gray-700 mb-6">Memories Made Forever.</h2>
        <div className="bg-white shadow-2xl rounded-lg p-8 w-96">
          <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
          <div className="mb-4">
            <input
              placeholder='Email'
              type='text'
              required
              id='email'
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4">
            <input
              placeholder='Password'
              type='password'
              required
              id='password'
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-gray-600">
              <input type='checkbox' className="mr-2" /> Remember me
            </label>
            <NavLink to="/sendotp" className="text-blue-500 hover:underline">Forgot password?</NavLink>
          </div>
          <button
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            onClick={loginapi}
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <NavLink to="/signin" className="text-blue-500 hover:underline">Register</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;