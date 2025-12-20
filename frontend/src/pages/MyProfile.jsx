import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  
  const {userData, setUserData, updateUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  return userData && (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-16 mt-16 bg-white text-gray-700">

      {/* FOTO PROFIL */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? "" : assets.upload_icon}
              alt=""
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="" />
      )}

      {/* NAMA */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none my-4" />

      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-200 text-sm">

          {/* EMAIL */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="text-gray-700 sm:col-span-2">{userData.email}</dd>
          </div>

          {/* PHONE */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">No. Telepon</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              ) : (
                <span className="text-blue-400">{userData.phone}</span>
              )}
            </dd>
          </div>

          {/* ADDRESS */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Alamat</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <>
                  <input
                    className="bg-gray-50 mb-2 w-full"
                    type="text"
                    value={userData.address}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: e.target.value
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  {userData.address}
                </>
              )}
            </dd>
          </div>

          {/* GENDER */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Jenis Kelamin</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <select
                  className="bg-gray-100 max-w-20"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              ) : (
                <span className="text-gray-400">{userData.gender}</span>
              )}
            </dd>
          </div>
        </dl>

        {/* BUTTONS */}
        <div className="mt-8">
          {isEdit ? (
            <button
              className="border border-second px-8 py-2 rounded-full hover:bg-second hover:text-white transition-all"
              onClick={() => updateUserProfileData(setIsEdit, image)}
            >
              Simpan Informasi
            </button>
          ) : (
            <button
              className="border border-second px-8 py-2 rounded-full hover:bg-second hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
