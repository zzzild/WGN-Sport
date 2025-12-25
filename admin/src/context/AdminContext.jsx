import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
          setAToken(data.token);
          toast.success("Login admin berhasil");
          
          navigate('/')
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
          setAToken(data.token);
          toast.success("Registrasi admin berhasil");

          navigate('/')
        } else {
          toast.error(data.message || "Registrasi admin gagal");
        }
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
      console.error(error);
    }
  };

  const value = {
    aToken,
    setAToken,
    onSubmitHandler,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
