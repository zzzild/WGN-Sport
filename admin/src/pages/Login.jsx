import React, { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const { onSubmitHandler } = useContext(AdminContext);

  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [secretKey, setSecretKey] = useState("");

  return (
    <form
      onSubmit={(e) =>
        onSubmitHandler(e, email, password, name, secretKey, state)
      }
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 mx-auto items-start p-8 min-w-[340px] sm:min-w-96 border-gray-300  border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto">
          {state === "Sign Up" ? "Buat akun" : "Login"} Admin{" "}
          <span className="text-teal-400">WGN Sport</span>
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <div className="w-full">
              <p>Name</p>
              <input
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="w-full">
              <p>Secret Key Admin</p>
              <input
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="password"
                onChange={(e) => setSecretKey(e.target.value)}
                value={secretKey}
                required
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="bg-teal-400 text-white w-full py-2 rounded-md text-base">
          Masuk
        </button>
        {state === "Sign Up" ? (
          <p>
            Sudah punya akun ?{" "}
            <span
              className="text-teal-400 underline cursor-pointer'"
              onClick={() => setState("Login")}
            >
              Masuk Admin
            </span>{" "}
          </p>
        ) : (
          <p>
            Belum punya akun ?{" "}
            <span
              className="text-teal-400 underline cursor-pointer'"
              onClick={() => setState("Sign Up")}
            >
              Daftar Admin
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
