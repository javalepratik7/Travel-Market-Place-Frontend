import React from 'react';
import popular1 from "./Images/popular1.jpg";
import popular2 from "./Images/popular2.jpg";
import popular3 from "./Images/popular3.jpg";

function Popular() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mt-6">Popular Visiting Place And Gallery</h1>
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <img src={popular1} alt="Popular place 1" className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105" />
        <img src={popular2} alt="Popular place 2" className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105" />
        <img src={popular3} alt="Popular place 3" className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105" />
      </div>
    </div>
  );
}

export default Popular;
