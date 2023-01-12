import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
// custome 
import Login from "./pages/login";
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
      {/* these pages are protected */}
      <Route element={<Protect />}>
        <Route path="/" element={<Dashboard />} >
          <Route path="/"  element={<Wallet/>}/>
          <Route path="/swap"  element={<Swap/>}/>
          <Route path="/topup"  element={<Topup/>}/>
          <Route path="/notifications"  element={<Notifications/>}/>
          <Route path="/setting"  element={<Setting/>}/>
        </Route>
      </Route>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

// handling authrition 
const useAuth = () => {
  return true;

}

function Protect() {
  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <Login />;
}