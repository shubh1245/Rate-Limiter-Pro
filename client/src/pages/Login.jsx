import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      return setError(
        "Please fill all fields"
      );
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");
    } catch (error) {
      setError(
        error?.response?.data
          ?.message ||
          "Login failed"
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
            Login to your account
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
          onSubmit={handleLogin}
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
              placeholder="Enter email"
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
              placeholder="Enter password"
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

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="
                text-blue-600
                text-sm
                hover:underline
              "
            >
              Forgot Password?
            </Link>
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
              transition
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          className="
            text-center
            mt-6
            text-slate-600
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;