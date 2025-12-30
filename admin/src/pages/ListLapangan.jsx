import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import EditLapanganModal from "../components/EditLapangan";

const ListLapangan = () => {
  const { allLapangan, lapanganList, changeAavailability, deleteLapangan } =
    useContext(AdminContext);

    const [openModal, setOpenModal] = useState(false);
    const [selectedLapangan, setSelectedLapangan] = useState(null);

  useEffect(() => {
    allLapangan();
  }, []);

  const handleEdit = (lapangan) => {
    setSelectedLapangan(lapangan);
    setOpenModal(true);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-zinc-800 mb-6">
        Daftar Lapangan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lapanganList.map((item, index) => (
          <div
            key={index}
            className="bg-white w-72 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-zinc-100"
          >
            {/* IMAGE */}
            <div className="h-36 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <p className="text-lg font-semibold text-zinc-800">
                {item.name}
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Rp {item.price.toLocaleString("id-ID")} / jam
              </p>

              {/* TOGGLE */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-zinc-600">Tersedia</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.available}
                    onChange={() => changeAavailability(item.lapanganId)}
                  />
                  <div className="w-10 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>

              {/* ACTION */}
              <div className="flex gap-2 mt-5">
                <button onClick={() => handleEdit(item)} className="flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                  Edit
                </button>
                <button onClick={() => deleteLapangan(item.lapanganId)} className="flex-1 text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <EditLapanganModal
          lapangan={selectedLapangan} 
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default ListLapangan;
