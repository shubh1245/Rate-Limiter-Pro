import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import API from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();

  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(300);

  useEffect(() => {
    if (timer <= 0) return;

    const interval =
      setInterval(() => {
        setTimer(
          (prev) => prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [timer]);

  const minutes =
    Math.floor(timer / 60);

  const seconds =
    timer % 60;

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/verify-otp",
          {
            email,
            otp,
          }
        );

      alert(
        response.data.message
      );

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

  const handleResendOTP =
    async () => {
      try {
        await API.post(
          "/auth/resend-otp",
          {
            email,
          }
        );

        setTimer(300);

        alert(
          "OTP sent successfully"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to resend OTP"
        );
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
        p-8
        rounded-xl
        shadow-lg
        w-full
        max-w-md
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-4
        "
        >
          Verify Email
        </h1>

        <p
          className="
          text-slate-500
          text-center
          mb-2
        "
        >
          OTP sent to
        </p>

        <p
          className="
          text-center
          font-semibold
          text-blue-600
          mb-6
        "
        >
          {email}
        </p>

        <div
          className="
          text-center
          mb-4
        "
        >
          <span
            className="
            text-red-500
            font-semibold
          "
          >
            OTP expires in{" "}
            {minutes}:
            {seconds
              .toString()
              .padStart(
                2,
                "0"
              )}
          </span>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="
          space-y-4
        "
        >
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
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

        <button
          onClick={
            handleResendOTP
          }
          disabled={timer > 0}
          className="
            w-full
            mt-4
            bg-green-600
            hover:bg-green-700
            text-white
            p-3
            rounded-lg
            font-medium
            disabled:bg-gray-400
          "
        >
          Resend OTP
        </button>

        <p
          className="
          text-center
          text-sm
          text-gray-500
          mt-4
        "
        >
          Resend button will
          activate after timer
          ends.
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;