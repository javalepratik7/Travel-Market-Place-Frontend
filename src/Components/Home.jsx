import { useAppSelector } from '../../Redux/hooks';
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from "axios";
import home from './Images/homeImage.png';
import {
  UserRoundPlus,
  TramFront,
  ArrowDownWideNarrow,
  IndianRupee,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

const Home = () => {
  const counter = useAppSelector((state) => state.auth);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function apiCall() {
      const response = await axios.post("https://travel-z3l6.onrender.com/traveler/tours");
      if (response.data.message === "please login aa") {
        alert(response.data.message);
        navigate("/login");
      }
      const all = response.data.info;
      const lastEight = all.slice(-6);
      setFilteredPackages(lastEight);
    }
    apiCall();
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-[#f8faf0]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-start">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  EXPLORE<br />WORLD
                </h1>
                <div className="mt-6 ml-4 flex items-center">
                  <div className="bg-orange-500 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-2">
                    <ArrowRight className="text-white" />
                  </div>
                  <div className="bg-orange-400 rounded-full w-8 h-8 md:w-10 md:h-10 -ml-6"></div>
                </div>
              </div>
              <p className="mt-6 text-base md:text-lg max-w-md">
                Travel is the movement of people between distant geographical locations. Travel can be done by foot, bicycle.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
              <img src={home} alt="Beach" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </section>

        {/* Follow Easy 4 Steps */}
        <section className="text-center px-4 md:px-16 py-12">
          <h1 className="text-3xl md:text-5xl font-bold text-black">Follow Easy 4 Steps</h1>
          <p className="text-sm md:text-lg text-[#7e7c7d] mt-6 max-w-4xl mx-auto">
            Follow easy 4 steps to explore tours, apply seamlessly, get quick confirmation, and complete secure payment for your dream trip.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <UserRoundPlus size={48} className="mx-auto text-green-500 mb-4" />
              <h2 className="font-bold">Create Account</h2>
              <p>First you have to create account here</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <ArrowDownWideNarrow size={48} className="mx-auto text-blue-400 mb-4" />
              <h2 className="font-bold">Filter Tours</h2>
              <p>Filter by destination, price, and transport.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <TramFront size={48} className="mx-auto text-blue-600 mb-4" />
              <h2 className="font-bold">Book Tour</h2>
              <p>Select a tour and book it instantly.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <IndianRupee size={48} className="mx-auto text-green-400 mb-4" />
              <h2 className="font-bold">Payment</h2>
              <p>Complete the payment to confirm booking.</p>
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Discover the world</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredPackages.map((tour, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <img
                  src={tour.Images || ""}
                  alt={tour.companyName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-1">{tour.companyName}</h2>
                  <p className="text-gray-600 mb-1">{tour.path}</p>
                  <p className="font-bold mb-1">Price: ₹{tour.prise || ""}</p>
                  <p className="text-gray-500 mb-4">{tour.days} Days / {tour.days - 1} Nights</p>
                  <NavLink
                    className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                    to="/toursInfo"
                    state={{ tour }}
                  >
                    Book now
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-16 pb-6 bg-[#f8faf0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">TravelMarket</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#beach">Beach</a></li>
                <li><a href="#adventure">Adventure</a></li>
                <li><a href="#city">City</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Example St. 121 City</li>
                <li>(555) 555-5555</li>
                <li>info@travel.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2024 TravelMarket. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy">Privacy Policy</a>
              <a href="#account">Account</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
