import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      otp: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/verify-otp",
          formData
        );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Verify Email
        </h1>

        <p className="text-slate-500 text-center mb-6">
          Enter the OTP sent to your email
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-lg
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-lg
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              p-3
              rounded-lg
              font-medium
            "
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;