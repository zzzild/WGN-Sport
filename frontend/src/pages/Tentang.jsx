import React from "react";
import { assets } from "../assets/assets";
import NavbarItem from "../components/Navbar-item";

const Tentang = () => {
  return (
    <div className="w-full">
      {/* HERO / TITLE SECTION */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center rounded-b-[2vw] flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${assets.header_img})` }}
        data-aos="fade-down"
        data-aos-duration="1200"
        data-aos-once="true"
      >
        <div className="absolute inset-0 bg-black/50 rounded-b-[2vw]" />
        <div className="relative text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-wide" data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="true">
            Tentang Kami — <span className="text-teal-400">WGN Sport</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-200 font-light"  data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="true">
            Temukan siapa kami dan misi kami dalam menghadirkan pengalaman
            olahraga terbaik
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-16 bg-white text-gray-700" data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true">
        {/* === TITLE & INTRO (LEFT ALIGNED) === */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
            WGN Sport
          </h1>
          <p className="text-sm text-gray-500 mb-2">Apa itu WGN Sport?</p>
          <p className="sm:w-2/3 text-sm text-gray-600 leading-relaxed">
            WGN Sport adalah platform pemesanan lapangan badminton yang dibuat
            untuk memududahkan kamu dalam mencari dan menyewa lapangan dengan
            cepat, praktis, dan nyaman.
            <br /> <br />
            Kami hadir untuk memberikan pengalaman bermain badminton yang lebih
            modern dan efisien. Tanpa perlu datang langsung ke lokasi, kamu bisa
            mengecek ketersediaan jadwal, memilih lapangan, dan melakukan
            booking hanya melalui satu platform.
          </p>
        </div>

        {/* === IMAGE & DESCRIPTION === */}
        <div className="my-10 flex flex-col md:flex-row items-center gap-12">
          <img
            className="w-full md:max-w-[360px] rounded-2xl shadow-lg object-cover"
            src={assets.place_img}
            alt="Tentang Kami"
          />

          <div className="flex flex-col justify-center gap-5 md:w-2/4 text-[15px] leading-relaxed text-gray-600 text-justify">
            <b className="text-gray-800 text-base">Visi Kami</b>
            <p>
              Menjadi layanan penyewaan lapangan olahraga yang praktis,
              terjangkau, dan dapat diandalkan. Kami ingin memastikan setiap
              pemain—baik pemula maupun profesional—bisa menikmati fasilitas
              terbaik tanpa ribet.
            </p>
            <p>
              Kami percaya olahraga bukan hanya tentang kompetisi, tapi juga
              tentang kebersamaan dan gaya hidup sehat. Dengan teknologi yang
              kami kembangkan, kami berkomitmen untuk membuat pengalaman
              olahraga menjadi lebih mudah diakses oleh siapa pun, kapan pun.
            </p>
          </div>
        </div>

        {/* === CONTACT & LOCATION === */}
        <div className="mt-10 pb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Lokasi & Kontak
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Informasi lokasi dan kontak resmi WGN Sport Center
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* ADDRESS CARD */}
            <div
              className="bg-white border rounded-xl p-6 shadow-sm transition-all duration-300
                hover:bg-teal-500 group hover:border-none"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-white">
                Alamat
              </h4>

              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white">
                WGN Sport Center
                <br />
                62, RT.001/RW.015, Kota Baru,
                <br />
                Kec. Bekasi Barat, Kota Bekasi,
                <br />
                Jawa Barat 17133
              </p>

              <a
                href="https://maps.app.goo.gl/zgCqHvsJFTQMqWy46"
                target="_blank"
                className="inline-block mt-4 text-teal-500 text-sm font-medium
               group-hover:text-white"
              >
                Lihat di Google Maps →
              </a>
            </div>

            {/* CONTACT CARD */}
            <div
              className="bg-white border rounded-xl p-6 shadow-sm transition-all duration-300
                hover:bg-teal-500 group hover:border-none"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-white">
                Kontak
              </h4>

              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white">
                Nomor Telepon / WhatsApp:
              </p>

              <a
                href="https://wa.me/6280000000000"
                target="_blank"
                className="inline-block mt-2 text-teal-500 text-sm font-medium
               group-hover:text-white"
              >
                +62 812 9166 4420 - +62 8788 2490 6179
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
