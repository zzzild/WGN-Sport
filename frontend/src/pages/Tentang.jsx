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
      >
        <div className="absolute inset-0 bg-black/50 rounded-b-[2vw]" />
        <div className="relative text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-wide">
            Tentang Kami — <span className="text-teal-400">WGN Sport</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-200 font-light">
            Temukan siapa kami dan misi kami dalam menghadirkan pengalaman olahraga terbaik
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-16 bg-white text-gray-700">

        {/* === TITLE & INTRO (LEFT ALIGNED) === */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
            WGN Sport
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            Apa itu WGN Sport?
          </p>
          <p className="sm:w-2/3 text-sm text-gray-600 leading-relaxed">
            WGN Sport adalah platform pemesanan lapangan badminton yang dibuat untuk
            memudahkan kamu dalam mencari dan menyewa lapangan dengan cepat, praktis, dan nyaman.
            <br /> <br />
            Kami hadir untuk memberikan pengalaman bermain badminton yang lebih
            modern dan efisien. Tanpa perlu datang langsung ke lokasi, kamu bisa
            mengecek ketersediaan jadwal, memilih lapangan, dan melakukan booking
            hanya melalui satu platform.
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
              Menjadi layanan penyewaan lapangan olahraga yang praktis, terjangkau,
              dan dapat diandalkan. Kami ingin memastikan setiap pemain—baik pemula
              maupun profesional—bisa menikmati fasilitas terbaik tanpa ribet.
            </p>
            <p>
              Kami percaya olahraga bukan hanya tentang kompetisi, tapi juga tentang
              kebersamaan dan gaya hidup sehat. Dengan teknologi yang kami kembangkan,
              kami berkomitmen untuk membuat pengalaman olahraga menjadi lebih mudah diakses
              oleh siapa pun, kapan pun.
            </p>
          </div>
        </div>

        {/* === WHY CHOOSE US === */}
        <div className="text-left mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">
            Kenapa <span className="text-teal-500">Memilih Kami</span>
          </h3>
          <p className="text-xs text-gray-500">
            Alasan mengapa pengguna mempercayai WGN Sport sebagai platform penyewaan lapangan terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pb-10">
          {[
            { title: "Mudah & Cepat", desc: "Booking lapangan bisa dilakukan kapan saja hanya dalam hitungan detik." },
            { title: "Transparan", desc: "Informasi jadwal dan harga ditampilkan jelas tanpa biaya tersembunyi." },
            { title: "Fasilitas Nyaman", desc: "Lapangan terawat dengan fasilitas pendukung yang nyaman dan bersih." },
            { title: "Pembayaran Aman", desc: "Tersedia berbagai metode pembayaran yang aman dan terpercaya." },
            { title: "Customer Support", desc: "Tim support kami siap membantu jika kamu mengalami kendala saat pemesanan." }
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded-xl px-6 py-8 sm:py-10 flex flex-col gap-4 text-[15px] hover:bg-teal-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-sm"
            >
              <b className="text-base">{item.title}</b>
              <p className="leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tentang;
