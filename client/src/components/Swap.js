import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faWallet,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
// custom
import Main from "./Main";
import Button from "../theme/Button";
import InputText from "../theme/InputText";
import { useSelector, useDispatch } from "react-redux";
import {
  selectETHBalance,
  selectUSDBalance,
  selectWalletAddress,
} from "../utils/slice/accountSlice";
import { setAlert } from "../utils/slice/alertSlice";
import { selectRequestCrypto } from "../utils/slice/requestCryptoSlice";
import { selectGetcrypto, setGetcrypto } from "../utils/slice/getCryptoSlice";
import { selectUser } from "../utils/slice/userSlice";
import { convertUSD } from "../utils/app";
import ViewRequestedCrypto from "./swap-list/ViewRequestedCrypto";
import axios from "axios";

export default function Swap() {
  const ETHBalance = useSelector(selectETHBalance);
  const USDBalance = useSelector(selectUSDBalance);
  const walletAddress = useSelector(selectWalletAddress);
  const userSelector = useSelector(selectUser);
  const getcryptoSelector = useSelector(selectGetcrypto);
  const listOfRequestedCrypto = useSelector(selectRequestCrypto);

  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0.0");
  const [errorHandling, setErrorHandling] = useState({
    amount: "",
    address: "",
  });

  const sendAlert = (type, message) => {
    const state = {
      type: type,
      message: message,
      isShow: true,
    };
    dispatch(setAlert(state));
  };

  const sendRequest = () => {
    let isErrorThere = false;

    let validation = /^\d+(?:\.\d+)?$/;

    let validationStatus = validation.test(amount);

    const tempValidation = {
      amount: "",
      address: "",
    };

    if (!validationStatus) {
      tempValidation.amount = "Please enter valide of amount";
      isErrorThere = true;
    }

    if (amount == 0) {
      tempValidation.amount = "Please enter some of amount";
      isErrorThere = true;
    }

    if (!address.trim()) {
      tempValidation.address = "Please enter wallet address";
      isErrorThere = true;
    }

    if (isErrorThere) {
      return setErrorHandling({ ...tempValidation });
    }

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
        if (data.success) {
          const { _id, ...res } = data.result;
          sendAlert(
            "success",
            "Request sent! Waiting for receiver to accept your ETH transfer."
          );
          dispatch(setGetcrypto({ id: _id, ...res, send: true }));
        }
      })
      .catch((error) => {
        sendAlert("error", "Whoops! An error occurred during the process.");
        console.log("🚀 ~ file: Swap.js:46 ~ axios.post ~ error:", error);
      });
  };

  const cancelRequest = () => {
    const url = `/api/swap/ETH/request`;
    const sendData = {
      id: getcryptoSelector.id,
      status: "cancel",
    };

    axios
      .put(url, sendData)
      .then(({ data }) => {
        if (data.success) {
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
          sendAlert("success", "Success! Your request has been cancelled.");
          dispatch(setGetcrypto(initialState));
        }
      })
      .catch((error) => {
        sendAlert("error", "Whoops! An error occurred during the process.");
        console.log("🚀 ~ file: Swap.js:46 ~ axios.post ~ error:", error);
      });
  };

  const clearSendRequest = () => {
    setAddress("");
    setAmount("0.0");
  };
  const sendNewRequestHTML = (
    <>
      <div className="my-2">
        <label className="text-slate-300 font-bold">
          Request crypto amount
        </label>
        <InputText
          value={amount}
          css="text-right"
          onChange={(e) => setAmount(e.target.value)}
        />
        <label className="text-red-400"> {errorHandling.amount}</label>
      </div>
      <div className="my-2 ">
        <label className="text-slate-300 font-bold">Enter Wallet Address</label>
        <InputText
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label className="text-red-400"> {errorHandling.address}</label>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button type="error" onClick={clearSendRequest}>
          Cancel
        </Button>
        <Button onClick={sendRequest}>Send</Button>
      </div>
    </>
  );

  const viewResponse = (
    <>
      <p className="text-center text-green-400">Request is send successfully</p>
      <div className="w-2/4 my-4 mx-auto">
        <Button type="error" onClick={cancelRequest}>
          Cancel
        </Button>
      </div>
    </>
  );

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

      {/* get crypto */}
      <div className="bg-slate-800 my-4 p-4 border-t border-slate-700 rounded-md">
        <p className="font-bold text-green-400 text-lg m-2">Get crypto</p>
        <div className="flex">
          {/* section 1 - enter amount of needed crypto*/}
          <div className="w-1/3 h-84 bg-slate-700 p-4">
            <div className="text-center">
              <img
                className="w-14  mx-auto m-2"
                src="img/ethereum.png"
                alt="ethereum logo"
              ></img>
              <p className="font-bold text-orange-500">Request crypto</p>
            </div>

            {/* check alredy is theare a new requested */}
            {getcryptoSelector.send ? viewResponse : sendNewRequestHTML}
          </div>
          {/* section 2  - view of stage*/}
          <div className="w-1/3 text-center bg-slate-700  mx-4 grid place-items-center">
            <div>
              <p
                className={
                  getcryptoSelector.send
                    ? "text-5xl text-blue-300 animate-bounce"
                    : "text-5xl text-blue-600"
                }
              >
                <FontAwesomeIcon icon={faBuildingColumns} />
              </p>
              <p className="font-bold text-green-400">
                {" "}
                {getcryptoSelector.USDValue
                  ? `${getcryptoSelector.USDValue} USD`
                  : "0.00 USD"}
              </p>
              <p className="text-2xl text-green-600">
                <FontAwesomeIcon icon={faArrowRight} />
              </p>
              <p className="text-slate-400">
                {getcryptoSelector.status ? (
                  <span className="text-orange-500">
                    {getcryptoSelector.status}
                  </span>
                ) : (
                  "Create a new transaction"
                )}
              </p>
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
                Requested{" "}
                <span className="text-green-500">
                  {getcryptoSelector.ETHValue
                    ? `${getcryptoSelector.ETHValue} ETH`
                    : "0.00 ETH"}
                </span>
              </p>

              {getcryptoSelector.receiverAddress && (
                <>
                  <p className="text-slate-500 text-xs">
                    {getcryptoSelector.receiverAddress}
                  </p>{" "}
                  <p className="text-slate-500 text-xs">( Wallet Address) </p>
                </>
              )}
            </div>
            {/* <p className="font-bold text-slate-500">
              Wallet ID :3x32423ss3asdf
            </p> */}
          </div>
        </div>
      </div>

      <p className="font-bold text-red-400 text-lg"> Requested Crypto</p>
      <div className="mb-32">
        {listOfRequestedCrypto.list.length === 0 && (
          <p className="text-center text-slate-600 mt-8">
            Data Is Not Available
          </p>
        )}
        {listOfRequestedCrypto.list.map((data, i) => (
          <ViewRequestedCrypto data={data} key={i} />
        ))}
      </div>
    </Main>
  );
}
