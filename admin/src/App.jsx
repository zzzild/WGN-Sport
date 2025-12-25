import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";

function App() {
  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
