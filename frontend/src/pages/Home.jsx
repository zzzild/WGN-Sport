import React from "react";
import Header from "../components/Header";
import Fasilitas from "../components/Fasilitas";
import TopLapangan from "../components/TopLapangan";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cta from "../components/Cta";

const Home = () => {
  return (
    <div>
      <Header />
      <Cta/>
    <Fasilitas/>
    <TopLapangan/>
    <Banner/>
    </div>
  );
};

export default Home;
