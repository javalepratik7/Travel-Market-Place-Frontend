import { useEffect, useRef, useState } from "react";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    setIsEmailSubmitted(true);
    console.log("Simulated OTP: 1234");
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join("") !== "1234") {
      alert("Invalid OTP. Please try again.");
      return;
    }
    setIsVerified(true);
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-400 to-purple-600">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg text-center w-96 text-white">
        <h1 className="text-2xl font-bold">Email Verification</h1>
        <p className="text-sm mt-2">
          {isVerified
            ? "Your email has been successfully verified!"
            : isEmailSubmitted
              ? `Enter the 4-digit OTP sent to ${email}`
              : "We'll send you a code to verify your email"}
        </p>

        {!isEmailSubmitted && !isVerified && (
          <form onSubmit={handleEmailSubmit} className="mt-4">
            <div className="text-left">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 bg-white bg-opacity-30 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-75"
              />
            </div>
            <button type="submit" className="w-full mt-4 p-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition transform hover:scale-105">
              Send Code →
            </button>
          </form>
        )}

        {isEmailSubmitted && !isVerified && (
          <div>
            <div className="flex justify-center gap-3 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-2xl text-center bg-white bg-opacity-30 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                />
              ))}
            </div>
            <button onClick={handleVerifyOtp} className="w-full mt-4 p-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition transform hover:scale-105">
              Verify OTP
            </button>
          </div>
        )}

        {isVerified && <p className="text-green-400 font-bold mt-4">✅ Your email is verified!</p>}
      </div>
    </div>
  );
};

export default EmailVerification;