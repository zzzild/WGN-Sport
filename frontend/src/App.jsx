import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lapangan from "./pages/Lapangan";
import Tentang from "./pages/Tentang";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lapangan" element={<Lapangan />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
