import { useState, createContext, useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../utils/slice/userSlice";
import { setRequestCrypto } from "../utils/slice/requestCryptoSlice";
import {
  selectWalletAddress,
  updateETH,
  selectETHBalance,
} from "../utils/slice/accountSlice";
import io from "socket.io-client";
import { setGetcrypto } from "../utils/slice/getCryptoSlice";
import {
  faUser,
  faWallet,
  faShuffle,
  faDollar,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// custome
// import ManuItem from '../components/MenuItem';

const MenuActiveContext = createContext("wallet");

export default function Dashboard() {
  const user = useSelector(selectUser);
  const walletAddress = useSelector(selectWalletAddress);
  const ETHBalance = useSelector(selectETHBalance);
  const dispatch = useDispatch();

  const [path, setPath] = useState("wallet");

  useEffect(() => {
    if (walletAddress) {
      // startup
      requestCryptoData();

      const socket = io("http://localhost:5000", {
        query: { address: walletAddress },
      });

      socket.on("connect", () => {
        console.log("Connected with ID:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });

      socket.on("message", (data) => {
        alertHandler(data);
        console.log("Received message:", data);
      });
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("message");
      };
    }
  }, [walletAddress]);

  const logout = () => {
    axios.post("/api/authentication/logout").then(({ data }) => {
      if (data.success) {
        window.location.href = "/login";
      }
    });
  };

  const checkETHBalance = () => {
    const url = `/api/account/ETH/${walletAddress}`;
    axios
      .get(url)
      .then(({ data }) => {
        if (data.success) {
          let { savingAccountETH, transactionAccountETH } = ETHBalance;
          savingAccountETH = data.balance - transactionAccountETH;
          dispatch(
            updateETH({
              totalETH: data.balance,
              savingAccountETH,
              transactionAccountETH,
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const requestCryptoData = () => {
    const url = `/api/swap/${walletAddress}`;

    axios
      .get(url)
      .then(({ data }) => {
        // console.log("🚀 ~ file: messageHandler.js:16 ~ .then ~ data:", data);
        let list = data.result;
        // get sender data -> status pending
        const index = list.findIndex(
          (rs) => rs.senderAddress === walletAddress
        );
        if (index > -1) {
          const tempData = list[index];
          const { _id, ...res } = tempData;
          dispatch(setGetcrypto({ id: _id, ...res, send: true }));
          list.splice(index, 1);
        }

        dispatch(setRequestCrypto(list));
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: messageHandler.js:13 ~ axios.get ~ error:",
          error
        );
      });
  };

  const acceptRequestETH = () => {
    const initialState = {
      id: "",
      createdAt: "",
      receiverAddress: "",
      senderAddress: "",
      USDValue: "",
      ETHValue: "",
      status: "",
      senderId: "",
      send: false,
    };

    dispatch(setGetcrypto(initialState));
  };

  const alertHandler = (message) => {
    switch (message) {
      case "update.balance.ETH":
        checkETHBalance();
        break;
      case "swap.request.balance.ETH":
        requestCryptoData();
        break;
      case "swap.request.cancel.ETH":
        requestCryptoData();
        break;
      case "swap.process.done.ETH":
        requestCryptoData();
        break;
      case "swap.request.accept.ETH":
        acceptRequestETH();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* top bar */}
      <nav className="w-full bg-opacity-60 backdrop-blur-lg fixed top-0 px-2 py-4 bg-gray-700 flex justify-end z-10">
        <code className="text-slate-400">
          Wallet Address: {walletAddress} |
        </code>
        <p className="font-bold text-white">
          <FontAwesomeIcon icon={faUser} className="mx-4 text-violet-700" />
          {user.name}
        </p>
        <button
          onClick={logout}
          className="bg-slate-600 mx-2 px-2 font-bold rounded hover:bg-slate-400 text-sm"
        >
          Logout
        </button>
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
