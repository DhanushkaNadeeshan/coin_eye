import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./utils/slice/userSlice";
// import Cookies from "js-cookie";
// custome
import Login from "./pages/login";
import SingUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Wallet from "./components/Wallet";
import Swap from "./components/Swap";
import Notifications from "./components/Notifications";
import Setting from "./components/Setting";
import Topup from "./components/Topup";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SingUp />} />
      {/* these pages are protected */}
      <Route element={<Protect />}>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Wallet />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <p className="text-slate-200 text-center mt-32">
            There's nothing here: 404!
          </p>
        }
      />
    </Routes>
  );
}

function Protect() {
  const user = useSelector(selectUser);

  return user.isLogin ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
