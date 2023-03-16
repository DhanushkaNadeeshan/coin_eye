import { useState } from "react";
import Question from "./Question";
import { useSelector, useDispatch } from "react-redux";
import { selectUSDBalance, updateUSD } from "../../utils/slice/accountSlice";
import { selectUser } from "../../utils/slice/userSlice";
import { setAlert } from "../../utils/slice/alertSlice";
import Button from "../../theme/Button";
import InputText from "../../theme/InputText";
import axios from "axios";
import { convertUSD, convertUSDWithoutDecimal } from "../../utils/app";

export default function TopupETH({ closeModal }) {
  const userSelector = useSelector(selectUser);
  const usdBalanceSelector = useSelector(selectUSDBalance);
  const dispatch = useDispatch();

  const [viewQuestion, setViewQuestion] = useState(true);
  const [amount, setAmount] = useState("0.00");

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

  const setUSDAmount = (value) => {
    const numberRegex = /^\d+(?:\.\d+)?$/;
    if (!numberRegex.test(value)) {
      return setAmount("0.00");
    }
    let tempValue = value.split(".");

    if (tempValue.length > 1) {
      value = tempValue.join("");
    }

    value = value / 100;
    value = value.toFixed(2);
    setAmount(value);
  };

  const makeTx = () => {
    const info = {
      id: userSelector.id,
      amount: convertUSDWithoutDecimal(amount),
      status: "add",
    };

    const url = `/api/account/USD/transaction`;
    axios
      .put(url, info)
      .then(({ data }) => {
        if (data.success) {
          const { totalUSD, transactionUSDBalance } = data.result;

          const updatedinfo = {
            totalUSD: totalUSD,
            savingAccountUSD: totalUSD - transactionUSDBalance,
            transactionAccountUSD: transactionUSDBalance,
          };
          sendAlert(
            "success",
            " USD transfer successful to transaction account!"
          );
          dispatch(updateUSD(updatedinfo));
          close();
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: TopupETH.js:35 ~ axios.put ~ error:", error);
        sendAlert("error", "Something is goin wrong!");
      });
  };

  if (viewQuestion) {
    return <Question closeModal={close} setViewQuestion={setViewQuestion} />;
  } else {
    return (
      <div>
        <p className="text-green-400 text-center">Get From Saving Account</p>

        <img
          src="./img/down-arrow.png"
          alt="downarrow"
          className="w-1/5 mx-auto animate-bounce mt-6"
        ></img>
        <div className="mt-8">
          <div className="w-3/4 mx-auto mt-3">
            <p className="text-left font-bold text-slate-400">Available ETH</p>
            <p className="text-slate-400 text-right text-xl">
              {convertUSD(usdBalanceSelector.savingAccountUSD)}{" "}
              <samp className="text-blue-700">ETH</samp>
            </p>
          </div>
          <div className="w-3/4 mx-auto mt-3">
            <p className="text-left font-bold text-slate-400">Amount</p>
            <InputText
              name="amount"
              css="text-right"
              value={amount}
              onChange={(e) => setUSDAmount(e.target.value)}
            />
          </div>
          <div className="w-1/2 my-8 mx-auto">
            <Button onClick={makeTx}>Update</Button>
          </div>
        </div>
      </div>
    );
  }
}
