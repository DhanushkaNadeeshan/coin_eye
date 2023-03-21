import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWalletAddress,
  selectETHBalance,
  updateETH,
} from "../../utils/slice/accountSlice";
import { setAlert } from "../../utils/slice/alertSlice";
import Button from "../../theme/Button";
import InputText from "../../theme/InputText";
import axios from "axios";

export default function CashoutETH({ closeModal }) {
  const walletAddress = useSelector(selectWalletAddress);
  const savingAccountETHSelector = useSelector(selectETHBalance);
  const dispatch = useDispatch();

  const [errorHandling, setErrorHandling] = useState("");
  const [amount, setAmount] = useState("0");

  const sendAlert = (type, message) => {
    const state = {
      type: type,
      message: message,
      isShow: true,
    };
    dispatch(setAlert(state));
  };

  const close = () => {
    closeModal();
  };

  const makeTx = () => {
    let validation = /^\d+(?:\.\d+)?$/;

    let validationStatus = validation.test(amount);

    if (amount == 0) {
      return setErrorHandling("Please enter some amount");
    }

    if (!validationStatus) {
      return setErrorHandling("Please enter valide amount");
    }

    if (
      parseFloat(amount) > parseFloat(savingAccountETHSelector.transactionAccountETH)
    ) {
      return setErrorHandling(
        "Oops! Your Transaction amount is higher than your available amount."
      );
    }

    const info = {
      address: walletAddress,
      amount: parseFloat(amount),
      status: "remove",
    };

    const url = `/api/account/ETH/transaction`;
    axios
      .put(url, info)
      .then(({ data }) => {
        if (data.success) {
          const { totalETH, transactionETHBalance } = data.result;

          const updatedinfo = {
            totalETH: totalETH,
            savingAccountETH: totalETH - transactionETHBalance,
            transactionAccountETH: transactionETHBalance,
          };

          dispatch(updateETH(updatedinfo));
          sendAlert("success", " ETH transfer successful to savings account!");
          close();
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: TopupETH.js:35 ~ axios.put ~ error:", error);
        if(error.response?.data.message ==='User is block'){
          sendAlert("error", "Your accout is partially block!");
        }else{
          sendAlert("error", "Something is goin wrong!");
        }

      });
  };

  return (
    <div>
      <p className="text-green-400 text-center">Send To Saving Account</p>

      <img
        src="./img/down-arrow.png"
        alt="downarrow"
        className="w-1/5 mx-auto animate-bounce mt-6"
      ></img>

      <div className="mt-8">
        <div className="w-3/4 mx-auto mt-3">
          <p className="text-left font-bold text-slate-400">Available ETH</p>
          <p className="text-slate-400 text-right text-xl">
            {savingAccountETHSelector.transactionAccountETH}{" "}
            <samp className="text-blue-700">ETH</samp>
          </p>
        </div>
        <div className="w-3/4 mx-auto mt-3">
          <p className="text-left font-bold text-slate-400">Amount</p>
          <InputText
            name="amount"
            css="text-right"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label className="text-red-400"> {errorHandling}</label>
        </div>
        <div className="w-1/2 my-8 mx-auto">
          <Button onClick={makeTx}>Update</Button>
        </div>
      </div>
    </div>
  );
}
