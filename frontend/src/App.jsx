import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Lapangan from "./pages/Lapangan";
import Tentang from "./pages/Tentang";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import MyProfile from "./pages/MyProfile";
import MyBooking from "./pages/MyBooking";
import Booking from "./pages/Booking";
import { ToastContainer } from 'react-toastify'
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    useEffect(() => {
    AOS.init({
      duration: 1000, // durasi animasi dalam ms
    });
  }, []);
  const location = useLocation();

  // List halaman yang TIDAK BOLEH ada navbar & footer
  const hideLayout = location.pathname === "/login";

  return (
    <>
      <ToastContainer />


      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lapangan" element={<Lapangan />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-booking" element={<MyBooking/>}/>
        <Route path="/booking/:lapanganId" element={<Booking/>}/>
      </Routes>

      {/* Tampilkan footer kecuali di halaman login */}
      {!hideLayout && <Footer />}
  </>
  );
}

export default App;
