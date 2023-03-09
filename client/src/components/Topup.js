import { useState } from "react";
import Main from "./Main";
import Button from "../theme/Button";
import Modal from "../theme/Modal";
import InputText from "../theme/InputText";
import { useSelector, useDispatch } from "react-redux";
import { selectCards } from "../utils/slice/accountSlice";
import { selectUser } from "../utils/slice/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { updateCard } from "../utils/slice/accountSlice";
import Alert from "../theme/Alert";

export default function Topup() {
  const dispatch = useDispatch();
  const cardsList = useSelector(selectCards);
  const userSelector = useSelector(selectUser);

  const [statusModalAdd, setStatusModalAdd] = useState(false);
  const [statusModalUpdate, setStatusModalUpdate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const alertHandler = () => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const insertNewCard = (e) => {
    e.preventDefault();

    // TODO: error handling
    const data = new FormData(e.target);

    const jsonData = {};

    for (const [key, value] of data.entries()) {
      jsonData[key] = parseInt(value);
    }

    jsonData.id = userSelector.id;

    axios
      .post("/api/card", jsonData)
      .then(({ data }) => {
        setStatusModalAdd(false);
        dispatch(updateCard(data.result));
        alertHandler();
      })
      .catch((error) => {
        console.log("🚀 ~ file: Topup.js:44 ~ axios.post ~ error:", error);
      });
  };

  return (
    <Main name="Topup">
      {showAlert && <Alert action={false}>Success</Alert>}
      <div className="text-center">
        <p className="font-bold  text-blue-500">Available crypto balance</p>

        <img
          className="w-16 mx-auto m-4"
          src="img/usd.png"
          alt="usd logo"
        ></img>

        <p className="text-slate-200 text-xl">
          101,000 <samp className="text-amber-200">USD</samp>
        </p>

        <div className="w-2/4 flex mx-auto justify-between text-slate-500">
          <p>Transaction account</p>
          <p>1,000</p>
        </div>

        <div className="w-2/4 flex mx-auto justify-between text-slate-500">
          <p>Saving account</p>
          <p>1,000</p>
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

            <select className="w-full">
              <option value="">Select a card</option>
              {cardsList.length > 0 &&
                cardsList.map((card, i) => {
                  let number = card.number;
                  number = number.substr(number.length - 5);
                  number = `***********${number}`;
                  return (
                    <option key={i} value={`${card.number}`}>
                      {number}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="w-2/4 mx-auto">
            <p className="text-left font-bold text-slate-400">Amount</p>
            <InputText />
          </div>

          <div className="w-1/4 mt-4 mx-auto">
            <Button>Topup</Button>
          </div>
        </div>
      </div>
      {/* Add new a card */}
      <Modal
        title="Add a new card"
        action={statusModalAdd}
        closeHandle={closeModalAdd}
      >
        <p className="text-center text-7xl my-10">
          <FontAwesomeIcon icon={faCreditCard} className="text-slate-200 " />
        </p>
        <form onSubmit={insertNewCard}>
          <div className="w-3/4 mx-auto my-3">
            <p className="text-left font-bold text-slate-400">Number</p>
            <InputText name="number" />
          </div>
          <div className="w-3/4 mx-auto my-3">
            <p className="text-left font-bold text-slate-400">CVC</p>
            <InputText name="cvc" />
          </div>
          <div className="w-3/4 mx-auto my-3">
            <p className="text-left font-bold text-slate-400">Expiry Year</p>
            <InputText name="expiryYear" />
          </div>
          <div className="w-3/4 mx-auto my-3">
            <p className="text-left font-bold text-slate-400">Expiry Month</p>
            <InputText name="expiryMonth" />
          </div>
          <div className="w-1/4 mt-4 mx-auto">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
      {/* Update or remove a card */}
      <Modal
        title="Update/Remove  card"
        action={statusModalUpdate}
        closeHandle={closeModalUpdate}
      >
        <p className="text-center text-7xl my-10">
          <FontAwesomeIcon icon={faCreditCard} className="text-slate-200 " />
        </p>

        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">Number</p>

          <select className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500">
            <option value="" className="text-slate-900 bg-slate-500">Select a card</option>
            {cardsList.length > 0 &&
              cardsList.map((card, i) => {
                let number = card.number;
                number = number.substr(number.length - 5);
                number = `***********${number}`;
                return (
                  <option key={i} value={`${card.number}`} className="text-slate-900 bg-slate-500">
                    {number}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">CVC</p>
          <InputText name="cvc" />
        </div>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">Expiry Year</p>
          <InputText name="expiryYear" />
        </div>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">Expiry Month</p>
          <InputText name="expiryMonth" />
        </div>
        <div className="w-3/4 flex mt-4 mx-auto">
          <div className="w-1/2 p-2">
            <Button type="error">Remove</Button>
          </div>
          <div className="w-1/2 p-2">
            <Button type="warning">Update</Button>
          </div>
        </div>
      </Modal>
    </Main>
  );
}
