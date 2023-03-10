import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Button from "../../theme/Button";
import InputText from "../../theme/InputText";
import { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../utils/slice/accountSlice";

export default function UpdateCard({
  cardsList,
  closeModelHandle,
  alertHandler,
  user,
}) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [id, setId] = useState("");
  const [cvc, setCVC] = useState("");
  const [expiryYear, setExpiryYear] = useState(null);
  const [expiryMonth, setExpiryMonth] = useState(null);

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

  const updateCardDetail = () => {
    let cardInfo = {
      number: newNumber,
      id,
      cvc,
      expiryYear,
      expiryMonth,
    };

    axios
      .put("/api/card", cardInfo)
      .then(({ data }) => {
        if (data.success) {
          dispatch(updateCard(data.result));
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: UpdateCard.js:65 ~ updateCard ~ err:", err);
        // alert("updat error!");
      })
      .finally(() => {
        closeModelHandle();
        alertHandler();
      });
  };

  const removeCard = () => {
    const cardInfo = {
      id,
      userId: user.id,
    };

    axios
      .delete("/api/card", { data: cardInfo })
      .then(({ data }) => {
    
        if (data.success) {
          dispatch(deleteCard({ id: data.result.id }));
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: UpdateCard.js:78 ~ removeCard ~ err:", err);
      })
      .finally(() => {
        closeModelHandle();
        alertHandler();
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
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">CVC</p>
        <InputText
          name="cvc"
          value={cvc}
          onChange={(e) => setCVC(e.target.value)}
        />
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">Expiry Year</p>
        <InputText
          name="expiryYear"
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
        />
      </div>
      <div className="w-3/4 mx-auto my-3">
        <p className="text-left font-bold text-slate-400">Expiry Month</p>
        <InputText
          name="expiryMonth"
          value={expiryMonth}
          onChange={(e) => setExpiryMonth(e.target.value)}
        />
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
