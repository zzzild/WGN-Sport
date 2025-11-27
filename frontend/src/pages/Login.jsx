import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Login = () => {
  const navigate = useNavigate();
  const { token, registUser, loginUser } = useContext(AppContext);

  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telp, setTelp] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      await registUser({ email, password, name, telp, gender, address });
    } else {
      await loginUser({ email, password });
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="w-full min-h-screen flex bg-white">
      {/* LEFT SIDE (IMAGE + TEXT + CURVE) */}
    <div
  className="hidden lg:flex flex-col justify-center px-14 text-white relative w-[55%] bg-cover bg-center"
  style={{ backgroundImage: `url(${assets.background_img})` }}
>

  {/* OVERLAY BIAR TEKS LEBIH KELIATAN (opsional) */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10">
    {/* LOGO */}
    <div className="mb-10">
      <img 
        src={assets.logoNoBg} // ganti sesuai logo
        alt="WGN Sport Logo"
        className="w-20 opacity-90"
      />
    </div>

    {/* HEADLINE */}
    <h1 className="text-5xl font-extrabold leading-[1.1] mb-4 tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
  Selamat datang di <span className="text-teal-600">WGN Sport</span>
</h1>

<h2 className="text-lg font-semibold mb-6 opacity-90 tracking-wider uppercase">
  Booking Lapangan Badminton Jadi Lebih Mudah
</h2>

<p className="text-xs opacity-90 max-w-sm leading-relaxed font-light">
  Temukan lapangan terbaik, atur jadwalmu, dan nikmati pengalaman bermain 
  yang lebih cepat, seamless, dan modern. Semua dalam satu platform yang 
  dirancang khusus untuk pemain seperti kamu.
</p>

<button
  className="mt-10 bg-white/25 backdrop-blur-xl border border-white/40 
  px-7 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-white/35 
  hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
  onClick={() => navigate('/')}

>
  Explore Courts
</button>
  </div>

</div>


      {/* RIGHT SIDE FORM */}
      <div className="flex w-full lg:w-[45%] justify-center items-center px-6">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-gray-900">
            {state === "Login" ? "Masuk" : "Buat akun"}
          </h1>

          {/* LOGIN */}
          {state === "Login" && (
            <>
              <div>
                <p className="font-medium">Email</p>
                <input
                  type="email"
                  required
                  className="border rounded-md w-full p-2 mt-1"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <p className="font-medium">Password</p>
                <input
                  type="password"
                  required
                  className="border rounded-md w-full p-2 mt-1"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {/* SIGN UP */}
          {state === "Sign Up" && (
            <>
              <div>
                <p className="font-medium">Nama Lengkap</p>
                <input
                  type="text"
                  required
                  className="border rounded-md w-full p-2 mt-1"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <p className="font-medium">Email</p>
                <input
                required
                  type="email"
                  className="border rounded-md w-full p-2 mt-1"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <p className="font-medium">Password</p>
                <input
                required
                  type="password"
                  className="border rounded-md w-full p-2 mt-1"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-medium">No. Telepon</p>
                  <input
                  required
                    type="text"
                    className="border rounded-md w-full p-2 mt-1"
                    placeholder="0812345678"
                    value={telp}
                    onChange={(e) => setTelp(e.target.value)}
                  />
                </div>

                <div>
                  <p className="font-medium">Jenis Kelamin</p>
                  <select
                  required
                    className="border rounded-md w-full p-2 mt-1"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="font-medium">Alamat</p>
                <textarea
                required
                  className="border rounded-md w-full p-2 mt-1"
                  placeholder="Masukkan alamat"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}

          {/* BUTTON */}
          <button className="bg-teal-600 text-white py-2 rounded-md mt-3">
            {state === "Login" ? "Sign in" : "Daftar"}
          </button>


          {/* SWITCH STATE */}
          <p className="text-sm text-gray-600 text-center mt-3">
            {state === "Login" ? (
              <>
                Belum punya akun?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-teal-600 underline cursor-pointer"
                >
                  Daftar disini
                </span>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-teal-600 underline cursor-pointer"
                >
                  Masuk disini
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
