import { useState, createContext, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWallet,
  faShuffle,
  faDollar,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
// custome
// import ManuItem from '../components/MenuItem';

const MenuActiveContext = createContext("wallet");

export default function Dashboard() {
  const [path, setPath] = useState("wallet");

  return (
    <>
      {/* top bar */}
      <nav className="w-full bg-opacity-60 backdrop-blur-lg fixed top-0 px-2 py-4 bg-gray-700 flex justify-end z-10">
        <p className="font-bold text-white">
          <FontAwesomeIcon icon={faUser} className="mx-4 text-violet-700" />
          User Name
        </p>
      </nav>

      {/* side bar */}
      <div className="w-1/5 p-3 h-screen fixed bg-slate-800 flex flex-col z-20">
        {/* brand name */}
        <h1 className="font-bold mx-2 mt-2 mb-6 text-cyan-500 text-2xl">
          Coin Eye
        </h1>
        {/* links */}
        <MenuActiveContext.Provider value={path}>
          <Link to="/" onClick={() => setPath("wallet")}>
            <ManuItem url="wallet">
              <p>
                <FontAwesomeIcon icon={faWallet} className="mx-4" /> Wallet
              </p>
            </ManuItem>
          </Link>

          <Link to="/swap" onClick={() => setPath("swap")}>
            <ManuItem url="swap">
              <p>
                <FontAwesomeIcon icon={faShuffle} className="mx-4" /> Swap
              </p>
            </ManuItem>
          </Link>
          <Link to="/topup" onClick={() => setPath("topup")}>
            <ManuItem url="topup">
              <p>
                <FontAwesomeIcon icon={faDollar} className="mx-4" /> Topup
              </p>
            </ManuItem>
          </Link>
          <Link to="/notifications" onClick={() => setPath("notifications")}>
            <ManuItem url="notifications">
              <p>
                <FontAwesomeIcon icon={faBell} className="mx-4" />
                Notifications
              </p>
              <div className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex w-2 h-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500"></span>
              </div>
              {/* <span className=' px-2 mx-2 text-white bg-red-500 text-sm rounded'>1</span> */}
            </ManuItem>
          </Link>
          <Link to="/setting" onClick={() => setPath("setting")}>
            <ManuItem url="setting">
              <p>
                <FontAwesomeIcon icon={faGear} className="mx-4" /> Setting
              </p>
            </ManuItem>
          </Link>
        </MenuActiveContext.Provider>
      </div>
      {/* main pages handling */}
      <div className="w-4/5 pt-16 px-4 float-right">
        <Outlet />
      </div>
    </>
  );
}

function ManuItem({ url, children }) {
  const path = useContext(MenuActiveContext);
  // get path name from url
  const active =
    path === url
      ? "text-neutral-200 bg-slate-500 py-1 rounded"
      : "text-stone-400";

  return (
    <div className={`flex w-full font-bold my-2 ${active}`}>{children}</div>
  );
}
