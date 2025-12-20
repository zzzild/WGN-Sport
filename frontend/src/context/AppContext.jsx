import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [lapangan, setLapangan] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const [lapanganInfo, setLapanganInfo] = useState(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState([]); // ← MULTI SELECT
  const [lapanganSlots, setLapanganSlots] = useState([]);
  const [booking, setBooking] = useState([]);

  const getLapanganData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/lapangan/all-lapangan"
      );
      if (data.success) {
        setLapangan(data.lapangan);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadProfileUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Invalid token"
      ) {
        toast.error("Sesi login habis, silakan login ulang.");
        setToken(false);
        localStorage.removeItem("token");
      } else {
        toast.error(error.message);
      }
    }
  };

  const updateUserProfileData = async (isEdit, image) => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', userData.address)
      formData.append('gender', userData.gender)
      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, 
        {headers: {
          Authorization: `Bearer ${token}`,
        }})

      if (data.success) {
        toast.success("Profile Berhasil diperbarui.")
        await loadProfileUserData()
        isEdit(false)
      } else {
        toast.error("Gagal memperbarui profile: " +  (data.message || "Silahkan coba lagii"))
      }
    } catch (error) {
      console.log(error)
      toast.error('Gagal memperbarui profil, coba lagi')
    }
  }

  const registerUser = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/register",
        formData
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Pendaftaran berhasil. Selamat datang!");
      } else {
        toast.error(data.message || "Pendaftaran gagal, silahkan coba lagi");
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat regist");
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login berhasil, Selamat datang kembali !!");
      } else {
        toast.error(
          data.message || "Login gagal, periksa kembali email dan password anda"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat login");
    }
  };

  const generateSlots = () => {
    if (!lapanganInfo) return;

    let today = new Date();
    let slots = [];

    const START_HOUR = 7;
    const END_HOUR = 23;

    const todayDate = today.getDate();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let slotPerDay = [];

      const isToday = currentDate.getDate() === todayDate;

      for (let hour = START_HOUR; hour < END_HOUR; hour++) {
        // HARI INI & JAM LEWAT → SKIP
        if (isToday && hour <= today.getHours()) continue;

        const slotTime = `${hour.toString().padStart(2, "0")}:00`;

        const d = currentDate.getDate();
        const m = currentDate.getMonth() + 1;
        const y = currentDate.getFullYear();
        const slotDate = `${d}_${m}_${y}`;

        const isBooked =
          lapanganInfo.slots_booked?.[slotDate]?.includes(slotTime);

        if (!isBooked) {
          slotPerDay.push({
            datetime: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              hour,
              0,
              0
            ),
            time: slotTime,
          });
        }
      }

      slots.push(slotPerDay);
    }

    setLapanganSlots(slots);
  };

  const toggleSlotTime = (time) => {
    if (slotTime.includes(time)) {
      setSlotTime(slotTime.filter((t) => t !== time));
      return;
    }

    if (slotTime.length >= 2) {
      toast.error("Kamu hanya bisa memilih maksimal 2 jam.");
      return;
    }

    setSlotTime([...slotTime, time]);
  };

  const fetchLapanganInfo = async (id) => {
    try {
      const { data } = await axios.get(backendUrl + `/api/lapangan/${id}`);

      if (data.success) {
        setLapanganInfo(data.lapangan);
      }
    } catch {
      toast.error("Gagal mengambil detail lapangan");
    }
  };

  const makeBooking = async (lapanganId, navigate) => {
    if (!token) {
      toast.warn("Silakan login terlebih dahulu.");
      return navigate("/login");
    }

    if (!lapanganSlots[slotIndex] || slotTime.length === 0) {
      return toast.error("Pilih minimal 1 jam.");
    }

    try {
      const dt = lapanganSlots[slotIndex][0].datetime;

      const d = dt.getDate();
      const m = dt.getMonth() + 1;
      const y = dt.getFullYear();

      const slotDate = `${d}_${m}_${y}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/booking-lapangan",
        {
          lapanganId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Booking berhasil!");
        await fetchLapanganInfo(lapanganId);
        setSlotTime([]);
        navigate("/my-booking");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat booking.");
    }
  };

  const getUserBooking = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/list-booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setBooking(data.booking.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil data booking, coba lagi");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const {data} = await axios.post(
        backendUrl + "/api/user/cancel-booking",
        {bookingId},
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );

      if (data.success) {
        toast.success("Booking lapangan dibatalkan");
        getUserBooking();
        getLapanganData()
      } else {
        toast.error("Gagal membatalkan booking" + data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat membatalkan booking")
    }
  }

  const value = {
    token,
    setToken,
    lapangan,
    setLapangan,
    getLapanganData,
    backendUrl,
    userData,
    setUserData,
    loadProfileUserData,
    registerUser,
    loginUser,
    fetchLapanganInfo,
    lapanganInfo,
    makeBooking,
    toggleSlotTime,
    generateSlots,
    lapanganSlots,
    setLapanganSlots,
    slotIndex,
    setSlotIndex,
    slotTime,
    setSlotTime,
    getUserBooking, booking,
    cancelBooking, updateUserProfileData
  };

  useEffect(() => {
    getLapanganData();
  }, []);

  useEffect(() => {
    if (token) {
      loadProfileUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
