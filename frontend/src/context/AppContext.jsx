import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [lapangan, setLapangan] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const [lapanganInfo, setLapanganInfo] = useState(null)
  const [lapanganSlot, setLapanganSlot] = useState([])
  const [slotIndex, setSlotIndex] = useState("")
  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ]

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

  const registerUser = async (formData) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/register', formData)
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Pendaftaran berhasil. Selamat datang!')
        } else {
          toast.error(data.message || 'Pendaftaran gagal, silahkan coba lagi')
        }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat regist");
    }
  }

  const loginUser = async ({email, password}) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login berhasil, Selamat datang kembali !!')
        } else {
          toast.error(data.message || 'Login gagal, periksa kembali email dan password anda')
        }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat login");
    }
  };

  const fetchLapanganInfo = (id) => {
    const info = lapangan.find((doc) => doc.lapanganId === id)
    setLapanganInfo(info)
    console.log(info)
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
    registerUser, loginUser,
    fetchLapanganInfo, lapanganInfo
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
