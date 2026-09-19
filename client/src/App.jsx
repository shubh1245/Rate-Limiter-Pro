import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import RequestLogs from "./pages/RequestLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logs" element={<RequestLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;