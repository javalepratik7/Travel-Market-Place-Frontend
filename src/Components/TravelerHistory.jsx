import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import coookie from "js-cookie";

export default function TravelerHistory() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function apiCall() {
      const cookie = coookie.get("token");
      const data = { cookie };
      try {
        // const response = await axios.post("http://localhost:8080/traveler/history", data);
        const response = await axios.post("https://travel-z3l6.onrender.com/traveler/history", data);
        setInfo(response.data.appliedTour);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    apiCall();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : (
        <>
          <Navbar />
          <div className="max-w-full mx-auto bg-[#f8faf0] p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Completed Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-10">
              {info.map((tour, index) => (
                <div key={index} className=" rounded-lg p-5 bg-white shadow-2xl hover:scale-105 transition-transform w-110">
                  <p><img src={tour.whichTour.Images} className="h-60 w-full rounded-lg object-cover" alt="Tour Image"></img></p>
                  <p><strong>Seat No:</strong> {tour.seatNo}</p>
                  <p><strong>Agent No:</strong> {tour.agentNo}</p>
                  <p><strong>Email:</strong> {tour.whichTour.email}</p>
                  <p><strong>Phone No:</strong> {tour.whichTour.phoneNo}</p>
                  <p><strong>Company Name:</strong> {tour.whichTour.companyName}</p>
                  <p><strong>Price:</strong> ₹{tour.whichTour.prise}</p>
                  <p><strong>Total Seats:</strong> {tour.whichTour.seats}</p>
                  <p><strong>Duration:</strong> {tour.whichTour.days} days</p>
                  <p><strong>Departure:</strong> {tour.whichTour.whenGo}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
