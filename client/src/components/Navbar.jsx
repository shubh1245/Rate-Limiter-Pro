import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <div>
          <h1 className="text-3xl font-bold">
            Rate Limiter Pro
          </h1>

          <p className="text-gray-400 text-sm">
            API Monitoring Dashboard
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">

          {token ? (
            <>
              <Link
                to="/"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/logs"
                className="hover:text-blue-400 transition"
              >
                Logs
              </Link>

              <Link
                to="/apikeys"
                className="hover:text-blue-400 transition"
              >
                API Keys
              </Link>

              <Link
                to="/apikey-analytics"
                className="hover:text-blue-400 transition"
              >
                API Analytics
              </Link>

              <button
                onClick={handleLogout}
                className="
                  bg-red-600
                  hover:bg-red-700
                  px-4
                  py-2
                  rounded-lg
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-4
                  py-2
                  rounded-lg
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-green-600
                  hover:bg-green-700
                  px-4
                  py-2
                  rounded-lg
                  transition
                "
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;