import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      return setError(
        "Please enter your email"
      );
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/forgot-password",
          {
            email,
          }
        );

      alert(
        response.data.message ||
          "OTP sent successfully"
      );

      navigate(
        "/reset-password",
        {
          state: {
            email,
          },
        }
      );
    } catch (error) {
      setError(
        error?.response?.data
          ?.message ||
          "Failed to send OTP"
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
          Forgot Password
        </h1>

        <p
          className="
            text-slate-500
            text-center
            mb-6
          "
        >
          Enter your email to receive
          a password reset OTP
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
          className="space-y-5"
        >
          <div>
            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-lg
              font-semibold
            "
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;