import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import jscookie from "js-cookie";
import images from './Images/user.jpg'

function Profile() {
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function apiCall() {
            const cookie = jscookie.get("token");
            setLoading(true);
            try {
                // const response = await axios.post("http://localhost:8080/user/profile", { cookie });
                const response = await axios.post("https://travel-z3l6.onrender.com/user/profile", { cookie });
                if (response.data && response.data.userInfo) {
                    setState(response.data.userInfo);
                } else {
                    console.error("Invalid response data:", response.data);
                    navigate("/login");
                    alert("Login first");
                }
            } catch (error) {
                console.error(error);
                navigate("/login");
                alert("Login first");
            } finally {
                setLoading(false);
            }
        }
        apiCall();
    }, []);

    function logOut() {
        jscookie.set('token', " ")
        navigate("/")
        alert("log out successfully")
    }

    return (
        <>
            {loading ? (
                <p className="text-center text-lg font-semibold mt-10">Loading...</p>
            ) : (
                <>
                    <Navbar />
                    <div className="w-100% max-w-100% rounded-3xl  p-8 shadow-sm flex justify-center bg-[#f8faf0] " >
                        <div className="flex flex-col items-center justify-center w-[500px]">
                            <div className="relative h-36 w-36   overflow-hidden rounded-full">
                                <img src={images} alt="user image" srcset="" />
                            </div>

                            <h1 className="mt-6 text-4xl font-bold text-gray-900">{state[0]?.name}</h1>

                            <p className="mt-2 text-xl text-gray-600">{state[0]?.email}</p>

                            <div className="mt-8 w-full space-y-6 " style={{ paddingLeft: "100px" }}>
                                <DetailRow label="Address" value={state[0]?.address} />
                                <DetailRow label="Role" value={state[0]?.role} />
                                {state[0].role == "user" ? "" : <>
                                    <DetailRow label="Company" value={state[0]?.companyName} />
                                    <DetailRow label="City" value={state[0]?.city} /></>}
                                <DetailRow label="Phone" value={state[0]?.phoneNumber} />
                            </div>
                        </div>
                    </div>
                    {state[0].role == "agent" ? "" : <div className="text-center bg-[#f8faf0] pt-6 pb-10">
                        <NavLink to="/travelerHistory">
                            <button className="text-lg bg-orange-500 text-white px-6 py-2 rounded-lg   hover:bg-orange-700 transition duration-300">
                                Traveler History
                            </button>
                        </NavLink>
                    </div>}
                    <div className="flex justify-center bg-[#f8faf0] pb-25">
                        <button onClick={logOut} className="bg-black text-white rounded-full px-6 py-2">Log out</button>
                    </div>
                </>
            )}
        </>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex items-center">
            <span className="w-1/3 text-lg text-gray-500">{label}</span>
            <span className="w-2/3 text-lg font-medium text-gray-900">{value}</span>
        </div>
    )
}

export default Profile;
