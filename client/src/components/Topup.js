import { useState } from "react";
import Main from "./Main";
import Button from "../theme/Button";
import Modal from "../theme/Modal";
import InputText from "../theme/InputText";
import { useSelector, useDispatch } from "react-redux";
import { selectCards } from "../utils/slice/accountSlice";
import { selectUser } from "../utils/slice/userSlice";
import axios from "axios";
import { updateUSD, selectUSDBalance } from "../utils/slice/accountSlice";
import { setAlert } from "../utils/slice/alertSlice";
import UpdateCard from "./card/UpdateCard";
import AddCard from "./card/AddCard";
import { convertUSD, convertUSDWithoutDecimal } from "../utils/app";
import Loader from "../theme/Loader";



export default function Topup() {
  const dispatch = useDispatch();
  const cardsList = useSelector(selectCards);
  const userSelector = useSelector(selectUser);
  const USDBalance = useSelector(selectUSDBalance);

  const [number, setNubmer] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [statusModalAdd, setStatusModalAdd] = useState(false);
  const [statusModalUpdate, setStatusModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorHandling, setErrorHandling] = useState({
    anwser: "",
    number: "",
  });

  const sendAlert = (type, message) => {
    const state = {
      type: type,
      message: message,
      isShow: true,
    };
    dispatch(setAlert(state));
  };

  const closeModalAdd = () => {
    setStatusModalAdd(false);
  };
  const openModalAdd = () => {
    setStatusModalAdd(true);
  };
  const closeModalUpdate = () => {
    setStatusModalUpdate(false);
  };
  const openModalUpdate = () => {
    setStatusModalUpdate(true);
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

  const topUpUsd = () => {
    let tempAmount = convertUSDWithoutDecimal(amount);
    let isErrorThere = false;

    const tempValidation = {
      amount: "",
      card: "",
    };

    if (tempAmount < 500) {
      tempValidation.amount = "Minimum Amout of Topup is 5$";
      isErrorThere = true;
    }

    if (!number) {
      tempValidation.number = "Please select a card";
      isErrorThere = true;
    }

    if (isErrorThere) {
      return setErrorHandling({ ...tempValidation });
    }

    const sendObj = {
      id: userSelector.id,
      amount: tempAmount,
      number: number,
    };
    // loader
    setLoading(true);

    axios
      .put("/api/account//USD/topup", sendObj)
      .then(({ data }) => {
        if (data.success) {
          let { totalUSD, transactionAccountUSD } = data.result;

          let updatedUSD = {
            totalUSD,
            transactionAccountUSD,
            savingAccountUSD: totalUSD - transactionAccountUSD,
          };
          sendAlert(
            "success",
            "Top-up complete! You've added USD to your account."
          );
          dispatch(updateUSD(updatedUSD));

          setAmount("0.00");
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: Topup.js:79 ~ axios.put ~ error:", error);
        sendAlert("error", "Whoops! An error occurred during the process.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Main name="Topup">
      {loading && <Loader />}

      <div className="text-center">
        <p className="font-bold  text-blue-500">Available USD balance</p>

        <img
          className="w-16 mx-auto m-4"
          src="img/usd.png"
          alt="usd logo"
        ></img>

        <p className="text-slate-200 text-xl">
          {convertUSD(USDBalance.totalUSD)}{" "}
          <samp className="text-amber-200">USD</samp>
        </p>

        <div className="w-2/4 flex mx-auto justify-between text-slate-500">
          <p>Transaction account</p>
          <p>{convertUSD(USDBalance.transactionAccountUSD)}</p>
        </div>

        <div className="w-2/4 flex mx-auto justify-between text-slate-500">
          <p>Saving account</p>
          <p>{convertUSD(USDBalance.savingAccountUSD)}</p>
        </div>

        <div className="w-3/6 m-2 grid grid-cols-2 gap-3 mx-auto">
          <Button onClick={openModalAdd}>Add a card</Button>
          <Button type="warning" onClick={openModalUpdate}>
            Update
          </Button>
        </div>

        <div className="w-2/4 mx-auto my-5 rounded py-6 bg-slate-800 border-t border-slate-700">
          <div className="w-2/4 mx-auto">
            <p className="text-left font-bold text-slate-400">Bank</p>

            <select
              className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500"
              onChange={(e) => setNubmer(e.target.value)}
            >
              <option value="" className="text-slate-900 bg-slate-500">
                Select a card
              </option>

              {cardsList.length > 0 &&
                cardsList.map((card, i) => {
                  let number = card.number;

                  number = number.substr(number.length - 5);
                  number = `***********${number}`;

                  return (
                    <option
                      key={i}
                      value={`${card.number}`}
                      className="text-slate-900 bg-slate-500"
                    >
                      {number}
                    </option>
                  );
                })}
            </select>
            <label className="text-red-400"> {errorHandling.number}</label>
          </div>

          <div className="w-2/4 mx-auto">
            <p className="text-left font-bold text-slate-400">Amount</p>
            <InputText
              value={amount}
              onChange={(e) => setUSDAmount(e.target.value)}
              className="text-right"
              css="text-right"
            ></InputText>
            <label className="text-red-400"> {errorHandling.amount}</label>
          </div>

          <div className="w-1/4 mt-4 mx-auto">
            <Button onClick={topUpUsd}>Topup</Button>
          </div>
        </div>
      </div>
      {/* Add new a card */}
      <Modal
        title="Add a new card"
        action={statusModalAdd}
        closeHandle={closeModalAdd}
      >
        <AddCard closeModelHandle={closeModalAdd} userSelector={userSelector} />
      </Modal>
      {/* Update or remove a card */}
      <Modal
        title="Update/Remove  card"
        action={statusModalUpdate}
        closeHandle={closeModalUpdate}
      >
        <UpdateCard
          cardsList={cardsList}
          closeModelHandle={closeModalUpdate}
          user={userSelector}
        />
      </Modal>
    </Main>
  );
}
