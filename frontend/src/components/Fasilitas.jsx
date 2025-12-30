import React from "react";
import { fasilitasData } from "../assets/assets";

const Fasilitas = () => {
  const icons = {
    mushola: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        stroke="white"
        className="size-6"
      >
        <path d="M20.707,1.293a1,1,0,0,0-1.414,0l-2,2A1,1,0,0,0,17,4V8.132L14.059,6.171A2.983,2.983,0,0,0,15,4a1,1,0,0,0-2,0,1,1,0,0,1-1,1h0a1,1,0,0,1,0-2,1,1,0,0,0,0-2A2.992,2.992,0,0,0,9.941,6.171L7,8.132V4a1,1,0,0,0-.293-.707l-2-2a1,1,0,0,0-1.414,0l-2,2A1,1,0,0,0,1,4V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V4a1,1,0,0,0-.293-.707ZM3,4.414l1-1,1,1V21H3Zm4,6.121L12,7.2l5,3.333V21H15V18a3,3,0,0,0-6,0v3H7ZM11,21V18a1,1,0,0,1,2,0v3Zm10,0H19V4.414l1-1,1,1Zm-6-8H9V11h6Z" />
      </svg>
    ),
    parkiran: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6"
      >
        <path d="M7 3h6a5 5 0 010 10H9v8H7V3zm2 2v6h4a3 3 0 000-6H9z" />
      </svg>
    ),
    toilet: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6"
      >
        <path d="M7 2a2 2 0 110 4 2 2 0 010-4zm10 0a2 2 0 110 4 2 2 0 010-4zM5 8h4v14H5V8zm10 0h4v14h-4V8z" />
      </svg>
    ),
    kantin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-6"
      >
        <path d="M10 2h2v8a2 2 0 11-2 0V2zm6 0a4 4 0 014 4v4h-2V6a2 2 0 00-2-2v18h-2V4a4 4 0 014-4zM6 2a4 4 0 00-4 4v4h2V6a2 2 0 012-2v18h2V4a4 4 0 00-4-4z" />
      </svg>
    ),
  };

  return (
    <div
      className="flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-12 text-gray-800"
      id="speciallity"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-5 w-full">
        {fasilitasData.map((item, index) => (
          <div class="text-center" key={index}>
            <div class="inline-flex rounded-lg bg-teal-600 p-3 text-gray-700">
              {icons[item.icon]}
            </div>

            <h3 class="mt-4 text-lg font-semibold text-gray-900">
              {item.title}
            </h3>

            <p class="mt-2 text-pretty text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fasilitas;
