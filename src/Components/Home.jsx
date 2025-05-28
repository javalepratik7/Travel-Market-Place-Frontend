import { useAppSelector } from '../../Redux/hooks';
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import home from './Images/homeImage.png';
import {
  UserRoundPlus,
  TramFront,
  ArrowDownWideNarrow,
  IndianRupee,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react';

const Home = () => {
  const counter = useAppSelector((state) => state.auth);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function apiCall() {
      const response = await axios.post("https://travel-z3l6.onrender.com/traveler/tours");
      console.log(response);
      console.log(response.data.info);

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

      <main className="flex-1 bg-[#f8faf0]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left"> {/* MOBILE RESPONSIVE */}
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-5xl sm:text-6xl md:text-9xl font-bold tracking-tight text-center md:text-left"> {/* MOBILE RESPONSIVE */}
                  EXPLORE<br />WORLD
                </h1>
                <div className="mt-6 flex items-center justify-center md:justify-start"> {/* MOBILE RESPONSIVE */}
                  <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                    <ArrowRight className="text-white" />
                  </div>
                  <div className="bg-orange-400 rounded-full w-10 h-10 -ml-6"></div>
                </div>
              </div>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg max-w-md text-center md:text-left mx-auto md:mx-0"> {/* MOBILE RESPONSIVE */}
                Travel is the movement of people between distant geographical locations. Travel can be done by foot, bicycle.
              </p>
            </div>
            <div className="relative w-full h-48 sm:h-60 md:h-130 mt-8 md:mt-0 overflow-hidden"> {/* MOBILE RESPONSIVE */}
              <img src={home} alt="Beach" className="h-full object-cover w-full rounded-md" />
            </div>
          </div>
        </section>

        {/* Follow Easy 4 Steps */}
        <div>
          <h1 className="text-center text-3xl sm:text-4xl md:text-[50px] font-bold text-black"> {/* MOBILE RESPONSIVE */}
            Follow Easy 4 Steps
          </h1>
          <h3 className="text-center text-sm sm:text-[19px] text-[#7e7c7d] mt-4 sm:mt-[30px] mx-4 sm:mx-[200px] px-2 sm:px-[90px]"> {/* MOBILE RESPONSIVE */}
            Follow easy 4 steps to explore tours, apply seamlessly, get quick confirmation, and complete secure payment for your dream trip.
          </h3>
          <div className="flex flex-col sm:flex-row justify-evenly gap-6 sm:gap-0 mx-4 sm:mx-0 my-10 sm:my-[80px]"> {/* MOBILE RESPONSIVE */}
            <div className="box box1">
              <div className="innerBox">
                <UserRoundPlus size={60} strokeWidth={2.5} className="mt-[35px] text-[rgb(0,250,63)]" />
                <h1>Create Account</h1>
                <h2>First you have to create account here</h2>
              </div>
            </div>
            <div className="box box3">
              <div className="innerBox">
                <ArrowDownWideNarrow size={60} strokeWidth={2.5} className="mt-[35px] text-[rgb(136,136,245)]" />
                <h1>Filter Tours</h1>
                <h2>Filter tours by destination, price, and Transport Type.</h2>
              </div>
            </div>
            <div className="box box2">
              <div className="innerBox">
                <TramFront size={60} strokeWidth={2.5} className="mt-[35px] text-[blue]" />
                <h1>Book tour</h1>
                <h2>First, select a tour and book tour.</h2>
              </div>
            </div>
            <div className="box box4">
              <div className="innerBox">
                <IndianRupee size={60} strokeWidth={2.5} className="mt-[35px] text-[rgb(94,240,94)]" />
                <h1>Payment complete</h1>
                <h2>Finally, complete the payment to confirm your booking</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations */}
        <section className="container mx-auto px-4 py-12" id="destinations">
          <h2 className="text-4xl font-bold text-center mb-12">Discover the world</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-20 ml-4 sm:ml-20 mr-4 sm:mr-20"> {/* MOBILE RESPONSIVE */}
            {filteredPackages.map((tour, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={tour.Images || ""}
                  alt={tour.companyName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{tour.companyName}</h2>
                <p className="text-gray-600 mb-2">{tour.path}</p>
                <p className="font-bold">Price: ₹{tour.prise || ""}</p>
                <p className="text-gray-500">{tour.days} Days/{tour.days - 1} Nights</p>

                <NavLink
                  className="block mt-4 text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                  to={"/toursInfo"}
                  state={{ tour }}
                >
                  Book now
                </NavLink>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-16 pb-6 bg-[#f8faf0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center sm:text-left"> {/* MOBILE RESPONSIVE */}
            <div>
              <h3 className="text-xl font-bold mb-4">TravelMarket</h3>
              <ul className="space-y-2">
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Destinations</h3>
              <ul className="space-y-2">
                <li><a href="#beach">Beach</a></li>
                <li><a href="#adventure">Adventure</a></li>
                <li><a href="#city">City</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Example St. 121 City</li>
                <li>(555) 555-5555</li>
                <li>info@travel.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow us</h3>
              <div className="flex justify-center sm:justify-start space-x-4">
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
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-center sm:text-left"> {/* MOBILE RESPONSIVE */}
            <p className="text-sm text-gray-600">© 2024 TravelMarket. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-sm text-gray-600">Privacy Policy</a>
              <a href="#account" className="text-sm text-gray-600">Account</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
