import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Data from "../components/Data";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, slotDateFormT } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <Data icon={assets.money} data={dashData.earning} title="Pemasukan" />
          <Data
            icon={assets.calender}
            data={dashData.booking}
            title="Booking"
          />
          <Data icon={assets.user} data={dashData.client} title="Pengguna" />
        </div>

        <div className="pt-4 border border-amber-50 border-t-0">
          {dashData.latestBooking.map((item, index) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              key={index}
            >
              <img
                className="rounded-full w-10 h-10"
                src={item.userData.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-600 font-medium">
                  {item.userData.name}
                </p>
                <p className="text-gray-600 font-medium">
                  {slotDateFormT(item.slotDate)}
                </p>
              </div>

              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Dibatalkan</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Selesai</p>
              ) : (
                <p className="text-yellow-400 text-xs font-medium">Menunggu</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
