import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (!email || !password || !verifyPassword || !otp) {
            setMessage("Please fill in all fields.");
            return;
        }
        if (password !== verifyPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const info = { email, password, otp };

        // await axios.post("http://localhost:8080/user/forgetPassword", info)
        await axios.post("https://travel-z3l6.onrender.com/user/forgetPassword", info)
            .then((res) => {
                alert(res.data.message);
                navigate('/');
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#f8faf0] h-screen">
                <div className="pt-15"></div>
                <div className="max-w-md mx-auto bg-white p-6 text-center border border-white rounded-lg  shadow-2xl transform transition-transform duration-300 hover:scale-105 ">
                    <h2 className="text-2xl font-bold mb-4 animate-fadeIn">Reset Password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        type="password"
                        placeholder="Verify new password"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-orange-700"
                    >
                        Reset Password
                    </button>
                    {message && <p className="mt-3 font-bold text-red-700 text-xl">{message}</p>}
                </div>
            </div>
        </>
    );
}
