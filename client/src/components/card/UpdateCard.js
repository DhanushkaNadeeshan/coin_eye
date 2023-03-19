import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Button from "../../theme/Button";
import InputText from "../../theme/InputText";
import { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../utils/slice/accountSlice";
import { setAlert } from "../../utils/slice/alertSlice";
import { dataEncryptionAES, dataDecryptedAES } from "../../utils/app";
import CryptoJS from "crypto-js";

export default function UpdateCard({ cardsList, closeModelHandle, user }) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [id, setId] = useState("");
  const [cvc, setCVC] = useState("");
  const [expiryYear, setExpiryYear] = useState(null);
  const [expiryMonth, setExpiryMonth] = useState(null);
  const [errorHandling, setErrorHandling] = useState({
    number: "",
    cvc: "",
    year: "",
    month: "",
  });

  useMemo(() => {
    let cardInfo = cardsList.find((data) => data.number === number);

    if (cardInfo) {
      setNewNumber(cardInfo.number);
      setId(cardInfo._id);
      setCVC(cardInfo.cvc);
      setExpiryMonth(cardInfo.expiryMonth);
      setExpiryYear(cardInfo.expiryYear);
    } else {
      setNewNumber("");
      setId("");
      setCVC("");
      setExpiryMonth("");
      setExpiryYear("");
    }
  }, [number]);

  const sendAlert = (type, message) => {
    const state = {
      type: type,
      message: message,
      isShow: true,
    };
    dispatch(setAlert(state));
  };

  const updateCardDetail = () => {
    let isErrorThere = false;

    const tempValidation = {
      number: "",
      cvc: "",
      year: "",
      month: "",
    };

    const regex = /^[+]?\d+$/;
    const regexMonth = /^(1[0-2]|[1-9])$/;
    const regexYear = /^([2][0][2-9][0-9])$/;

    let cardInfo = {
      number: newNumber,
      id,
      cvc,
      expiryYear,
      expiryMonth,
    };

    if (!regex.test(cardInfo.number)) {
      tempValidation.number = "Please check card number again";
      isErrorThere = true;
    }

    if (!regex.test(cardInfo.cvc)) {
      tempValidation.cvc = "Please  check card cvc number again";
      isErrorThere = true;
    }

    if (
      !regex.test(cardInfo.expiryYear) ||
      !regexYear.test(cardInfo.expiryYear)
    ) {
      tempValidation.expiryYear = "Please  check card expiry year again";
      isErrorThere = true;
    }

    if (
      !regex.test(cardInfo.expiryMonth) ||
      !regexMonth.test(cardInfo.expiryMonth)
    ) {
      tempValidation.expiryMonth = "Please  check card expiry month again";
      isErrorThere = true;
    }

    if (isErrorThere) {
      return setErrorHandling({ ...tempValidation });
    }

    const encrptedData = dataEncryptionAES(CryptoJS, JSON.stringify(cardInfo));
    axios
      .put("/api/card", { encrptedData })
      .then(({ data }) => {
        if (data.success) {
          // decrypting the data
          const decryptedData = dataDecryptedAES(CryptoJS, data.result);
          dispatch(updateCard(decryptedData));
          sendAlert("success", "Success! You've updated your card");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: UpdateCard.js:65 ~ updateCard ~ err:", err);
        sendAlert("error", "Whoops! An error occurred during the process.");
      })
      .finally(() => {
        closeModelHandle();
      });
  };

  const removeCard = () => {
    const cardInfo = {
      id,
      userId: user.id,
    };
    if (!id) {
      sendAlert("error", "Whoops! Please select a card");
      return false;
    }

    axios
      .delete("/api/card", { data: cardInfo })
      .then(({ data }) => {
        if (data.success) {
          dispatch(deleteCard({ id: data.result.id }));
          sendAlert(
            "success",
            "Success! You've removed the card from your account."
          );
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: UpdateCard.js:78 ~ removeCard ~ err:", err);
        sendAlert("error", "Whoops! An error occurred during the process.");
      })
      .finally(() => {
        closeModelHandle();
      });
  };

  return (
    <>
      <p className="text-center text-7xl my-5">
        <FontAwesomeIcon icon={faCreditCard} className="text-slate-200 " />
      </p>

      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">Number</p>

        <select
          className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500"
          onChange={(e) => setNumber(e.target.value)}
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
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">Number</p>
        <InputText
          name="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <label className="text-red-400"> {errorHandling.number}</label>
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">CVC</p>
        <InputText
          name="cvc"
          value={cvc}
          onChange={(e) => setCVC(e.target.value)}
        />
        <label className="text-red-400"> {errorHandling.cvc}</label>
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">Expiry Year</p>
        <InputText
          name="expiryYear"
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
        />
        <label className="text-red-400"> {errorHandling.expiryYear}</label>
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">Expiry Month</p>
        <InputText
          name="expiryMonth"
          value={expiryMonth}
          onChange={(e) => setExpiryMonth(e.target.value)}
        />
        <label className="text-red-400"> {errorHandling.expiryMonth}</label>
      </div>
      <div className="w-3/4 flex mt-4 mx-auto">
        <div className="w-1/2 p-2">
          <Button type="error" onClick={removeCard}>
            Remove
          </Button>
        </div>
        <div className="w-1/2 p-2">
          <Button type="warning" onClick={updateCardDetail}>
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
