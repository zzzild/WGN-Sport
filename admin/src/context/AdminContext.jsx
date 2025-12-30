import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken"));
  const navigate = useNavigate();
  const [dashData, setDashData] = useState();
  const [booking, setBooking] = useState([]);
  const [lapanganList, setLapanganList] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormT = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const onSubmitHandler = async (
    e,
    email,
    password,
    name,
    secretKey,
    state
  ) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          toast.success("Login admin berhasil");

          navigate("/dashboard");
        } else {
          toast.error(data.message || "Login gagal");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/admin/regist`, {
          name,
          secretKey,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          toast.success("Registrasi admin berhasil");

          navigate("/");
        } else {
          toast.error(data.message || "Registrasi admin gagal");
        }
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
      console.error(error);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getAllBooking = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/booking", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      if (data.success) {
        setBooking(data.booking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/complete-booking",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success("Pembayaran disetujui");
        getAllBooking();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-booking",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success("Pembayaran ditolak");
        getAllBooking();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const allLapangan = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/admin/all-lapangan", {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      if (data.success) {
        setLapanganList(data.lapangan);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const changeAavailability = async (lapanganId) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/admin/change-availability", {lapanganId}, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      if (data.success) {
        toast.success("Ketersediaan lapangan diubah");
        allLapangan();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const updateLapangan = async (lapanganId, formData) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/update-lapangan/${lapanganId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (data.success) {
      toast.success("Lapangan berhasil diperbarui");
      allLapangan();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const deleteLapangan = async (lapanganId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/delete-lapangan`,
      { lapanganId },
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (data.success) {
      toast.success("Lapangan berhasil dihapus");
      allLapangan();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  const value = {
    aToken,
    setAtoken,
    onSubmitHandler,
    getDashData,
    dashData,
    getAllBooking,
    booking,
    slotDateFormT,
    completeBooking,
    cancelBooking,
    allLapangan,
    lapanganList,
    changeAavailability,
    updateLapangan,
    deleteLapangan,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
