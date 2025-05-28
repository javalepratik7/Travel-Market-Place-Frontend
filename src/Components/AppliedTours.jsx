import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import jsCookies from "js-cookie";

export default function AppliedTours() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { item } = location.state;
    console.log(item)

    useEffect(() => {
        async function apiCall() {
            setLoading(true);
            const cookie = jsCookies.get("token");
            const info = { tour_id: item._id, cookie };

            try {
                // const response = await axios.post("http://localhost:8080/agent/appliedInfo", info);
                const response = await axios.post("https://travel-z3l6.onrender.com/agent/appliedInfo", info);
                console.log(response);
                setData(response.data.applied);

            } catch (error) {
                console.log("error is running");
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        }

        apiCall();
    }, [item._id]);

    return (
        <>
            <Navbar />
            <div className="max-w-full mx-auto p-6 bg-[#f8faf0] flex flex-col justify-center ">
                {loading ? (
                    <p className="text-center text-lg font-semibold">Loading...</p>
                ) : (
                    <>
                        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 w-5xl ml-55">
                            <div className="bg-orange-500 rounded-lg text-white p-6">
                                <h1 className="text-4xl font-bold text-center">{item.path} Tour</h1>
                                <div className="w-full border-t border-gray-300 mt-4"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                <div className="space-y-4 pt-10">
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-2xl font-bold">Company</span>
                                        <span className="text-2xl">{item.companyName}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-2xl font-bold">Duration</span>
                                        <span className="text-2xl">{item.days} Days</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-2xl font-bold">Start Date</span>
                                        <span className="text-2xl">{item.whenCome}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-2xl font-bold">Route</span>
                                        <span className="text-2xl">{item.path}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-2xl font-bold">Price</span>
                                        <span className="text-2xl">₹ {item.prise}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="text-right mt-4 ">
                                        <img src={item.Images} alt="" srcset="" className="rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-2xl rounded-2xl p-6 w-5xl ml-55">
                            <h2 className="text-4xl font-bold mb-4 text-orange-500">Applicants</h2>
                            <p className="text-gray-600 text-xl font-bold mb-4">Total Applicants: {data.length}</p>
                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-2">Name</th>
                                            <th className="border px-4 py-2">Email</th>
                                            <th className="border px-4 py-2">Phone</th>
                                            <th className="border px-4 py-2">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((applicant, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{applicant.whoApplied.name}</td>
                                                <td className="border px-4 py-2">{applicant.whoApplied.email}</td>
                                                <td className="border px-4 py-2">{applicant.whoApplied.phoneNumber}</td>
                                                <td className="border px-4 py-2">{applicant.paymentCompleted ? "Paid" : "Pending"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}