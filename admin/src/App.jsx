import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllBooking from "./pages/AllBooking";
import ListLapangan from "./pages/ListLapangan";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {aToken ? (
        // ===== ADMIN LAYOUT =====
        <div >
            <Navbar />

          <div className="flex">
          <Sidebar />

            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/all-booking" element={<AllBooking />} />
              <Route path="/list-lapangan" element={<ListLapangan />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        // ===== AUTH LAYOUT =====
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
