import React from "react";
import { fasilitasData } from "../assets/assets";

const Fasilitas = () => {
  return (
    <div
  className="flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-12 text-gray-800"
  id="speciallity"
  data-aos="fade-up"
  data-aos-duration="1000"
>
  <h1 className="text-5xl font-medium">Fasilitas Tersedia</h1>
  <p className="sm:w-1/2 text-sm">
    Beragam fasilitas kami hadirkan untuk mendukung kenyamanan Anda saat bermain badminton di WGN Sport.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-5 w-full">
    {fasilitasData.map((item, index) => (
      <article
        key={index}
        className="
          relative overflow-hidden rounded-xl shadow-md bg-white
          transition hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
          duration-300
        "
      >
        <img
          alt={item.title}
          src={item.img}
          className="w-full h-48 object-cover object-bottom"
        />

        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-xs mt-1 line-clamp-2 opacity-90">
            {item.desc}
          </p>
        </div>
      </article>
    ))}
  </div>
</div>

  );
};

export default Fasilitas;
