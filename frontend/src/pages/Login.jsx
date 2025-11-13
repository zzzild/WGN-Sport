import React, { useState } from 'react'
import NavbarItem from '../components/Navbar-item'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [state, setState] = useState("Login")

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [telp, setTelp] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')

  return (
    <>
      <NavbarItem />

      <div className="flex pt-28 flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-gray-800">
        <form className='min-h-[80vh] flex items-center justify-center'>
          
          <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[420px] border rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
            
            <p className='text-2xl font-semibold text-gray-800'>
              {state === 'Sign Up' ? 'Buat Akun' : "Masuk"}
            </p>
            <p className="text-gray-500">
              Silahkan {state === 'Sign Up' ? 'buat akun' : "masuk"} untuk melakukan booking
            </p>

            {state === 'Sign Up' && (
              <>
                {/* Nama */}
                <div className='w-full'>
                  <p>Nama Lengkap</p>
                  <input
                    className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                  />
                </div>

                {/* Email */}
                <div className='w-full'>
                  <p>Email</p>
                  <input
                    className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="email"
                    placeholder="contoh: email@gmail.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                {/* Password */}
                <div className='w-full'>
                  <p>Password</p>
                  <input
                    className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="password"
                    placeholder="Minimal 6 karakter"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                {/* Telp + Gender */}
                <div className='flex flex-col sm:flex-row w-full gap-4'>
                  <div className='w-full sm:w-1/2'>
                    <p>No. Telepon</p>
                    <input
                      className='border border-zinc-300 rounded w-full p-2 mt-1'
                      type="tel"
                      placeholder="081234567890"
                      onChange={(e)=>setTelp(e.target.value)}
                      value={telp}
                    />
                  </div>

                  <div className='w-full sm:w-1/2'>
                    <p>Jenis Kelamin</p>
                    <select
                      className='border border-zinc-300 rounded w-full p-2 mt-1 bg-white'
                      onChange={(e)=>setGender(e.target.value)}
                      value={gender}
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                {/* Alamat */}
                <div className='w-full'>
                  <p>Alamat</p>
                  <textarea
                    className='border border-zinc-300 rounded w-full p-2 mt-1 min-h-[60px]'
                    placeholder="Masukkan alamat lengkap"
                    onChange={(e)=>setAddress(e.target.value)}
                    value={address}
                  ></textarea>
                </div>
              </>
            )}

            {state === 'Login' && (
              <>
                <div className='w-full'>
                  <p>Email</p>
                  <input
                    className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className='w-full'>
                  <p>Password</p>
                  <input
                    className='border border-zinc-300 rounded w-full p-2 mt-1'
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </>
            )}

            <button
              type='submit'
              className='bg-teal-600 text-white w-full py-2 rounded-md text-base font-medium hover:bg-teal-700 transition'
            >
              {state === 'Sign Up' ? 'Daftar' : "Masuk"}
            </button>

            {state === "Sign Up" ? (
              <p className='text-gray-600 text-sm'>
                Sudah punya akun?{" "}
                <span onClick={()=>setState('Login')} className='text-teal-600 underline cursor-pointer'>
                  Masuk disini
                </span>
              </p>
            ) : (
              <p className='text-gray-600 text-sm'>
                Belum punya akun?{" "}
                <span onClick={()=>setState('Sign Up')} className='text-teal-600 underline cursor-pointer'>
                  Daftar disini
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
