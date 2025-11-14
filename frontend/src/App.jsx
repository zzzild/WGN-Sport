import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lapangan from "./pages/Lapangan";
import Tentang from "./pages/Tentang";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import MyProfile from "./pages/MyProfile";
import MyBooking from "./pages/MyBooking";
import Booking from "./pages/Booking";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lapangan" element={<Lapangan />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-booking" element={<MyBooking/>}/>
        <Route path="/booking/:lapanganId" element={<Booking/>}/>
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
