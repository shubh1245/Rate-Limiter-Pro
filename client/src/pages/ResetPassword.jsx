import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return setError(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/reset-password",
          {
            email:
              formData.email,
            otp:
              formData.otp,
            newPassword:
              formData.newPassword,
          }
        );

      alert(
        response.data.message
      );

      navigate("/login");
    } catch (error) {
      setError(
        error?.response?.data
          ?.message ||
          "Reset Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        flex
        justify-center
        items-center
        px-4
      "
    >
      <div
        className="
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          w-full
          max-w-md
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-center
            mb-2
          "
        >
          Reset Password
        </h1>

        <p
          className="
            text-slate-500
            text-center
            mb-6
          "
        >
          Enter OTP and create
          a new password
        </p>

        {error && (
          <div
            className="
              bg-red-100
              text-red-600
              p-3
              rounded-lg
              mb-4
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
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
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={
              formData.newPassword
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={
              formData.confirmPassword
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
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
              bg-green-600
              hover:bg-green-700
              text-white
              py-3
              rounded-lg
              font-semibold
            "
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;