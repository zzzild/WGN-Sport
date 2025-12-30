import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cta = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
          {/* TEXT */}
          <div
            className="pt-8 md:pt-12 lg:pt-24 pb-8"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
          >
            <h1 className="text-5xl font-medium text-black">
              Tentang <span className="text-teal-600">WGN Sport</span>
            </h1>

            <p
              className="hidden text-black/90 text-justify pr-5 sm:mt-4 sm:block"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-once="true"
            >
              WGN Sport adalah sebuah tempat penyewaan lapangan bulu tangkis
              sekaligus platform pemesanan yang dirancang untuk memudahkan kamu
              dalam menyewa lapangan badminton dengan cepat, praktis, dan
              nyaman.
              <br />
              <br />
              Kami hadir untuk memberikan pengalaman bermain badminton yang
              lebih modern dan efisien. Tanpa perlu datang langsung ke lokasi,
              kamu dapat mengecek ketersediaan jadwal, memilih lapangan, hingga
              melakukan booking hanya melalui satu platform.
            </p>

            <div
              className="mt-4 md:mt-8"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once="true"
            >
              <button
                onClick={() => {
                  navigate("/tentang");
                  window.scrollTo(0, 0);
                }}
                className="inline-block rounded-sm border bg-teal-600 px-12 py-3 text-sm font-medium text-white
                  hover:scale-[1.05] active:scale-[0.95]
                  transition-all duration-300
                  shadow-[0_0_10px_rgba(0,0,0,0.15)]
                  cursor-pointer"
              >
                Selengkapnya
              </button>
            </div>
          </div>

          {/* IMAGES */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img
              src={assets.badmin1}
              alt="Badminton 1"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once="true"
            />
            <img
              src={assets.badmin2}
              alt="Badminton 2"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
              data-aos="fade-down"
              data-aos-delay="500"
              data-aos-once="true"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cta;
