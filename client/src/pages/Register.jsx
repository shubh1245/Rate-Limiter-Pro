import { useState } from "react";
import API from "../services/api";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return setError(
        "Please fill all fields"
      );
    }

    if (
      password !==
      confirmPassword
    ) {
      return setError(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      alert(
        response.data.message ||
          "OTP sent to your email"
      );

      navigate(
        "/verify-otp",
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
          "Registration failed"
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
        items-center
        justify-center
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
        <div className="text-center mb-8">
          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
            "
          >
            Rate Limiter Pro
          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Create your account
          </p>
        </div>

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
          onSubmit={
            handleRegister
          }
          className="
            space-y-5
          "
        >
          <div>
            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Name
            </label>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>
                setName(
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

          <div>
            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(
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

          <div>
            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
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
              bg-green-600
              hover:bg-green-700
              text-white
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p
          className="
            text-center
            mt-6
            text-slate-600
          "
        >
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="
              text-blue-600
              font-semibold
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;