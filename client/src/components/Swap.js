import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faArrowLeft,
  faWallet,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
// custom
import Main from "./Main";
import Button from "../theme/Button";
import InputText from "../theme/InputText";
import { useSelector } from "react-redux";
import {
  selectETHBalance,
  selectUSDBalance,
  selectWalletAddress,
} from "../utils/slice/accountSlice";
import { selectUser } from "../utils/slice/userSlice";
import { convertUSD } from "../utils/app";
import axios from "axios";

export default function Swap() {
  const ETHBalance = useSelector(selectETHBalance);
  const USDBalance = useSelector(selectUSDBalance);
  const walletAddress = useSelector(selectWalletAddress);
  const userSelector = useSelector(selectUser);

  const [isRequestedETH, setIsRequestedETH] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0.0");
  const [sendUSD, setSendUSD] = useState("");

  const sendRequest = () => {
    const sendData = {
      senderId: userSelector.id,
      senderAddress: walletAddress,
      receiverAddress: address,
      amount: amount,
    };

    const url = `/api/swap/ETH/request`;

    axios
      .post(url, sendData)
      .then(({ data }) => {
        console.log("🚀 ~ file: Swap.js:46 ~ .then ~ data:", data);
      })
      .catch((error) => {
        console.log("🚀 ~ file: Swap.js:46 ~ axios.post ~ error:", error);
      });
  };
  return (
    <Main name="Swap">
      {/* summery of account */}
      <div className="grid  grid-cols-2">
        {/* details of crypto  */}
        <div className="flex">
          <img
            className="w-14  m-2"
            src="img/ethereum.png"
            alt="ethereum logo"
          ></img>
          <div className="w-3/4">
            <p className="font-bold  text-blue-500">Available crypto balance</p>
            <div className="flex justify-between text-slate-500">
              <p>Transaction account</p>
              <p>{ETHBalance.transactionAccountETH} (ETH)</p>
            </div>
            <div className="flex justify-between text-slate-500">
              <p>Saving account</p>
              <p>{ETHBalance.savingAccountETH} (ETH)</p>
            </div>
          </div>
        </div>
        {/* details of usd  */}
        <div className="flex">
          <img
            className="w-14 h-14 m-2"
            src="img/usd.png"
            alt="ethereum logo"
          ></img>
          <div className="w-3/4">
            <p className="font-bold  text-blue-500">Available usd balance</p>
            <div className="flex justify-between text-slate-500">
              <p>Transaction account</p>
              <p>{convertUSD(USDBalance.transactionAccountUSD)} (USD)</p>
            </div>
            <div className="flex justify-between text-slate-500">
              <p>Saving account</p>
              <p>{convertUSD(USDBalance.savingAccountUSD)} (USD)</p>
            </div>
          </div>
        </div>
      </div>
      {/* send crypto */}

      {isRequestedETH && (
        <div className="bg-slate-800 border-t border-slate-700 p-4 rounded-md">
          <p className="font-bold text-red-400 text-lg">Send crypto</p>
          <div className="flex">
            <div className="w-1/3">
              <div className="text-center">
                {/* logo  */}
                <img
                  className="w-14  mx-auto m-2"
                  src="img/ethereum.png"
                  alt="ethereum logo"
                ></img>
                <p className="font-bold text-orange-500">
                  Requested crypto amount
                </p>
                {/* showing requested crypto */}
                <p className="font-bold text-slate-200 text-lg">0.000 ETH</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button type="error">Cancel</Button>
                <Button>Send</Button>
              </div>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-5xl text-blue-600 animate-bounce">
                <FontAwesomeIcon icon={faBuildingColumns} />
              </p>
              <p className="font-bold text-green-400 animate-pulse">
                10.00 USD
              </p>
              <p className="text-2xl text-green-600">
                <FontAwesomeIcon icon={faArrowLeft} />
              </p>
              <p className="text-slate-400">Wait for...</p>
            </div>
            <div className="w-1/3 text-center">
              <FontAwesomeIcon
                className="text-4xl text-orange-600"
                icon={faWallet}
              />
              <p className="font-bold text-slate-400">
                User Requested <span className="text-red-500">10.00 ETH</span>
              </p>
              <p className="font-bold text-slate-500">
                Wallet ID :3x32423ss3asdf
              </p>
            </div>
          </div>
        </div>
      )}

      {/* get crypto */}
      <div className="bg-slate-800 my-4 p-4 border-t border-slate-700 rounded-md">
        <p className="font-bold text-green-400 text-lg m-2">Get crypto</p>
        <div className="flex">
          {/* section 1 - enter amount of needed crypto*/}
          <div className="w-1/3 bg-slate-700 p-4">
            <div className="text-center">
              <img
                className="w-14  mx-auto m-2"
                src="img/ethereum.png"
                alt="ethereum logo"
              ></img>
              <p className="font-bold text-orange-500">Request crypto</p>
            </div>

            <div className="my-2">
              <label className="text-slate-300 font-bold">
                Request crypto amount
              </label>
              <InputText
                value={amount}
                css="text-right"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="my-2 ">
              <label className="text-slate-300 font-bold">
                Enter Wallet Address
              </label>
              <InputText
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button type="error">Cancel</Button>
              <Button onClick={sendRequest}>Send</Button>
            </div>
          </div>
          {/* section 2  - view of stage*/}
          <div className="w-1/3 text-center bg-slate-700  mx-4 grid place-items-center">
            <div>
              <p className="text-5xl text-blue-600 animate-bounce">
                <FontAwesomeIcon icon={faBuildingColumns} />
              </p>
              <p className="font-bold text-green-400 animate-pulse">0.00 USD</p>
              <p className="text-2xl text-green-600">
                <FontAwesomeIcon icon={faArrowRight} />
              </p>
              <p className="text-slate-400">Create a new transaction</p>
            </div>
          </div>
          {/* section 3 - show requested user status */}
          <div className="w-1/3 text-center bg-slate-700  grid place-items-center">
            <div>
              <FontAwesomeIcon
                className="text-4xl text-orange-600"
                icon={faWallet}
              />
              <p className="font-bold text-slate-400">
                Requested <span className="text-green-500">0.00 ETH</span>
              </p>
            </div>
            {/* <p className="font-bold text-slate-500">
              Wallet ID :3x32423ss3asdf
            </p> */}
          </div>
        </div>
      </div>
    </Main>
  );
}
