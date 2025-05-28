import { useEffect, useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import jsCookies from "js-cookie"

const Tours = () => {

   const navigate = useNavigate();
  
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState("All");
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [minPrice,setMinPrice]=useState(0)
  const [maxPrice,setMaxPrice]=useState(Infinity)

  const priceRanges = [
    { label: "Less than 5000", min: 0, max: 4999 },
    { label: "5000-15000", min: 5000, max: 15000 },
    { label: "15000-25000", min: 15000, max: 25000 },
    { label: "25000-50000", min: 25000, max: 50000 },
    { label: "Greater than 50000", min: 50001, max: Infinity },
  ];

  useEffect(() => {
    async function apiCall() {

      try {
        const cookie = jsCookies.get("token")
        // const response = await axios.post("http://localhost:8080/traveler/tours", { cookie: cookie })
        const response = await axios.post("https://travel-z3l6.onrender.com/traveler/tours", { cookie: cookie })
        console.log(response);
        console.log(response.data.info)

        if (response.data.message === "please login aa") {
          alert(response.data.message);
          navigate("/login");
        }
        setTours(response.data.info)

      } catch (error) {
        console.log(error);

      }
    }
    apiCall()
  }, []);

  const filteredTours = tours.filter((tour) => {

    const matchesSearch =
      search === "" || tour.path.toLowerCase().includes(search.toLowerCase());

    const matchesCity = cityFilter === "All" ||  tour.path.toLowerCase().includes(cityFilter.toLowerCase()); 

    const matchesPrice =
         tour.prise >= minPrice && tour.prise <= maxPrice;

    const matchesTransport =
      selectedTransport === "All" || tour.transportType === selectedTransport;

    return matchesSearch && matchesCity && matchesPrice && matchesTransport;
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-[#f8faf0]" >
        <h1 className="text-3xl font-bold text-center mb-6">Tour Packages</h1>

        <div className="flex flex-wrap gap-4 justify-center mb-6" >
          <input
            type="text"
            placeholder="Search tours..."
            className="border p-2 rounded-md shadow-sm w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{width:"350px"}}
          />

          <select
            className="border p-2 rounded-md shadow-sm"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{width:"350px"}}
          >
            <option value="All">All Cities</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>

          <select
            className="border p-2 rounded-md shadow-sm"
            value={selectedPrices}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedPrices(value);
          
              if (value === "car") {
                setMinPrice(0);
                setMaxPrice(5000);
                console.log(minPrice,maxPrice);
              } else if (value === "train") {
                setMinPrice(5000);
                setMaxPrice(15000);
                console.log(minPrice,maxPrice);
              } else if (value === "plane") {
                setMinPrice(15000);
                setMaxPrice(Infinity); 
                console.log(minPrice,maxPrice);
              } else if (value === "All") {
                setMinPrice(0);
                setMaxPrice(Infinity); 
                console.log(minPrice,maxPrice);
              } else {
                setMinPrice(0);
                setMaxPrice(Infinity); 
                console.log(minPrice,maxPrice);
              }} }
            style={{width:"350px"}}
          >
            <option value="price">Price</option>
            <option value="All">All</option>
            <option value="car">Less than 5000</option>
            <option value="train">5000-15000</option>
            <option value="plane">Greater than 15000</option>
          </select>
          <select
            className="border p-2 rounded-md shadow-sm"
            value={selectedTransport}
            onChange={(e) => setSelectedTransport(e.target.value)}
            style={{width:"350px"}}
          >
            <option value="All">All Transport</option>
            <option value="car">Car</option>
            <option value="train">Train</option>
            <option value="plane">Plane</option>
          </select>
        </div>

        {showPriceFilter && (
          <div className="flex flex-wrap gap-4 mb-6 justify-center bg-[white]"> 
            {priceRanges.map((range, index) => (
              <div key={index} className="flex items-center gap-2 bg-[white]">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedPrices.includes(range.label)}
                  onChange={() => handlePriceChange(range.label)}
                />
                <label>{range.label}</label>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTours.map((tour, index) => (
            <div key={index} className="border rounded-lg shadow-md p-4 bg-[#f7f8f3f0]" >
              <img
                src={tour.Images|| ""}
                alt={tour.companyName|| ""}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{tour.companyName ||""}</h2>
              <p className="text-gray-600 mb-2">{tour.path ||""}</p>
              <p className="font-bold">Price: ₹{tour.prise ||""}</p>
              <p className="text-gray-500">{tour.days} Days/{tour.days - 1} Nights</p>

              <NavLink
                className="block mt-4 text-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                to={"/toursInfo"}
                state={{ tour }}
              >
                Book now
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tours;