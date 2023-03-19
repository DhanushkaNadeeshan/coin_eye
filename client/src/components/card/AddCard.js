import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Button from "../../theme/Button";
import InputText from "../../theme/InputText";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dataEncryptionAES, dataDecryptedAES } from "../../utils/app";
import { addCard } from "../../utils/slice/accountSlice";
import { setAlert } from "../../utils/slice/alertSlice";
import CryptoJS from "crypto-js";

export default function AddCard({ closeModelHandle, userSelector }) {
  const dispatch = useDispatch();

  const [errorHandling, setErrorHandling] = useState({
    number: "",
    cvc: "",
    year: "",
    month: "",
  });

  const sendAlert = (type, message) => {
    const state = {
      type: type,
      message: message,
      isShow: true,
    };
    dispatch(setAlert(state));
  };

  const insertNewCard = (e) => {
    e.preventDefault();

    let isErrorThere = false;

    const tempValidation = {
      number: "",
      cvc: "",
      year: "",
      month: "",
    };

    const data = new FormData(e.target);

    const jsonData = {};

    for (const [key, value] of data.entries()) {
      jsonData[key] = parseInt(value);
    }

    const regex = /^[+]?\d+$/;
    const regexMonth = /^(1[0-2]|[1-9])$/;
    const regexYear = /^([2][0][2-9][0-9])$/;

    if (!regex.test(jsonData.number)) {
      tempValidation.number = "Please check card number again";
      isErrorThere = true;
    }

    if (!regex.test(jsonData.cvc)) {
      tempValidation.cvc = "Please  check card cvc number again";
      isErrorThere = true;
    }

    if (
      !regex.test(jsonData.expiryYear) ||
      !regexYear.test(jsonData.expiryYear)
    ) {
      tempValidation.expiryYear = "Please  check card expiry year again";
      isErrorThere = true;
    }

    if (
      !regex.test(jsonData.expiryMonth) ||
      !regexMonth.test(jsonData.expiryMonth)
    ) {
      tempValidation.expiryMonth = "Please  check card expiry month again";
      isErrorThere = true;
    }

    if (isErrorThere) {
      return setErrorHandling({ ...tempValidation });
    }

    jsonData.id = userSelector.id;

    const encrptedData = dataEncryptionAES(CryptoJS, JSON.stringify(jsonData));
   
    axios
      .post("/api/card", { encrptedData })
      .then(({ data }) => {
        sendAlert("success", "You've successfully added a new card!");
        // reset the error handling
        setErrorHandling({ ...tempValidation });
        // decrypting the data
        const decryptedData = dataDecryptedAES(CryptoJS, data.result);
     
        dispatch(addCard(decryptedData));
      })
      .catch((error) => {
        console.log("🚀 ~ file: Topup.js:44 ~ axios.post ~ error:", error);
        sendAlert("error", "Whoops! An error occurred during the process.");
      })
      .finally(() => {
        closeModelHandle();
      });
  };
  return (
    <>
      <p className="text-center text-7xl my-10">
        <FontAwesomeIcon icon={faCreditCard} className="text-slate-200 " />
      </p>
      <form onSubmit={insertNewCard}>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">Number</p>
          <InputText name="number" />
          <label className="text-red-400"> {errorHandling.number}</label>
        </div>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">CVC</p>
          <InputText name="cvc" />
          <label className="text-red-400"> {errorHandling.cvc}</label>
        </div>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">Expiry Year</p>
          <InputText name="expiryYear" />
          <label className="text-red-400"> {errorHandling.expiryYear}</label>
        </div>
        <div className="w-3/4 mx-auto my-3">
          <p className="text-left font-bold text-slate-400">Expiry Month</p>
          <InputText name="expiryMonth" />
          <label className="text-red-400"> {errorHandling.expiryMonth}</label>
        </div>
        <div className="w-1/4 mt-4 mx-auto">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
