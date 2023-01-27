import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
// custome
import Login from "./pages/login";
import SingUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Wallet from "./components/Wallet";
import Swap from "./components/Swap";
import Notifications from "./components/Notifications";
import Setting from "./components/Setting";
import Topup from "./components/Topup";
import axios from "axios";

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

// handling authrition
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const key = Cookies.get("key");
    if (key) {
      axios
        .post("/api/auth/jwt", { key })
        .then(({ data }) => {
          if (data.valide) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        })
        .catch((err) => {
          setIsAuth(false);
        });
    } else {
      setIsAuth(false);
    }
  }, []);

  return { isAuth };
};

function Protect() {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Login />;
}
