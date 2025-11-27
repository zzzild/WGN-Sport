import React from "react";

const Cta = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="pt-8 md:pt-12 lg:pt-24 pb-8">
            <div>
              <h1 className="text-5xl font-medium text-black">
                Tentang <span className="text-teal-600">WGN Sport</span>
              </h1>

              <p className="hidden text-black/90 text-justify pr-5 sm:mt-4 sm:block">
                WGN Sport adalah sebuah tempat penyewaan lapangan bulu tangkis
                sekaligus platform pemesanan yang dirancang untuk memudahkan
                kamu dalam menyewa lapangan badminton dengan cepat,
                praktis, dan nyaman.<br/> <br/>Kami hadir untuk memberikan pengalaman
                bermain badminton yang lebih modern dan efisien. Tanpa perlu
                datang langsung ke lokasi, kamu dapat mengecek ketersediaan
                jadwal, memilih lapangan, hingga melakukan booking hanya
                melalui satu platform.
              </p>

              <div className="mt-4 md:mt-8">
                <button
                  href="#"
                  className="inline-block rounded-sm border bg-teal-600 px-12 py-3 text-sm font-medium text-white  hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)
            transition-all duration-300 cursor-pointer "
                >
                  Selengkapnya
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?auto=format&fit=crop&q=80&w=1160"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
            <img
              src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=80&w=1160"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
