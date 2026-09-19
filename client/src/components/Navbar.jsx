import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px"
      }}
    >
      <Link to="/">Dashboard</Link>

      <Link to="/logs">Logs</Link>

      <Link to="/apikeys">API Keys</Link>
    </nav>
  );
}

export default Navbar;