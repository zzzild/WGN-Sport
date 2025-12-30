import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const EditLapanganModal = ({ lapangan, onClose }) => {
  const { updateLapangan } = useContext(AdminContext);

  const [form, setForm] = useState({
    name: lapangan.name,
    price: lapangan.price,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);

    updateLapangan(lapangan.lapanganId, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Lapangan</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Lapangan</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Harga / Jam</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Ganti Gambar</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1"
            />
          </div>

          {/* ACTION */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLapanganModal;
