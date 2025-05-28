import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

const PopularCityCards = () => {
  const [popularCities, setPopularCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function apiCall() {
      // const response = await axios.post("http://localhost:8080/traveler/tours")
      const response = await axios.post("https://travel-z3l6.onrender.com/traveler/tours")

      const lastSix = response.data.info.slice(-6); // Gets the last 6 elements
      // setPopularCities(response.data.info)
      setPopularCities(lastSix)

    }
    apiCall()
    
  }, []);

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (popularCities.length === 0) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-20">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
        Popular City Tours
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {popularCities.map((tour) => (
          <div
            key={tour._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={tour.Images}
                alt={tour.companyName}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                srcSet=""
              />
              <div className="absolute inset-0 border-4 border-white rounded-2xl" />
            </div>
            <div className="p-5 text-start">
              <h3 className="text-xl font-semibold text-blue-700">{`City: ${tour.path}`}</h3>
              <p className="text-md text-gray-600">{`Company: ${tour.companyName}`}</p>
              <p className="text-sm text-gray-500">{`Route: ${tour.path}`}</p>
              <p className="text-lg font-semibold mt-3 text-green-600">{`₹${tour.prise}`}</p>


              <NavLink
                to={`/toursInfo`}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 hover:scale-105 transition duration-200 block text-center mt-4" state={{ tour }}
              >
                Book Now
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCityCards;
