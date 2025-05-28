import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import jscookie from "js-cookie"
import { useAppSelector } from "../../Redux/hooks";
import { useNavigate } from 'react-router-dom';

const AgentHistory = () => {
    const [tours, setTours] = useState([]);
    const counter = useAppSelector((state) => state.auth);
    const navigate = useNavigate();


    async function deleteTour(item) {
        try {
            const cookie = jscookie.get("token")
            const info = { cookie, tour_id: item._id }
            const response = await axios.post("http://localhost:8080/agent/deleteTour", info)
            setTours(response.data.tours)
            alert(response.data.message)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (counter.isAuthenticate == false) {
            alert("This page is only for agents")
            navigate("/login")
        }
        async function apiCall() {
            try {
                console.log("This is fetching");
                const cookie = jscookie.get("token")
                const info = { cookie }
                // await axios.post("http://localhost:8080/agent/history", info)
                await axios.post("https://travel-z3l6.onrender.com/agent/history", info)
                    .then((response) => {
                        setTours(response.data.tours)
                    })
                    .catch((error) => console.error("Error loading data:", error));
            } catch (error) {
                console.log(error);
                alert(error)
            }
        }
        apiCall()
    }, []);


    const [selectedTour, setSelectedTour] = useState(null);

    return (
        < >
            <Navbar role={"agent"} />
            <div className="travel-marketplace w-full pl-[2vw] pt-[30px] pr-[2vw] bg-[#f8faf0]">
                <h1 className="mb-[50px] text-[24px] font-bold text-center" >Travel Marketplace</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                    {tours.map((item, index) => (
                        <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
                            <img
                                src={item.Images || ""}
                                alt={item.companyName}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{item.companyName}</h2>
                            <p className="text-gray-600 mb-2">{item.path}</p>
                            <p className="font-bold">Price: ₹{item.prise}</p>
                            <p className="text-gray-500">{item.days} Days/{item.days - 1} Nights</p>

                            <div className="flex gap-3">
                                <NavLink
                                    className="block mt-4 text-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 w-1/2"
                                    to={"/appliedTours"}
                                    state={{ item }}
                                >
                                    Show Info
                                </NavLink>
                                <button onClick={() => { deleteTour(item) }} className="block mt-4 text-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 w-1/2">Delete Tour</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AgentHistory;
