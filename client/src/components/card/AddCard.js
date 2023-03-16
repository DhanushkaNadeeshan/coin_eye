import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Button from "../../theme/Button";
import InputText from "../../theme/InputText";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCard } from "../../utils/slice/accountSlice";
import { setAlert } from "../../utils/slice/alertSlice";

export default function AddCard({ closeModelHandle, userSelector }) {

  const dispatch = useDispatch();

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
        sendAlert("success", "You've successfully added a new card!")
        dispatch(addCard(data.result));
      })
      .catch((error) => {
        console.log("🚀 ~ file: Topup.js:44 ~ axios.post ~ error:", error);
        sendAlert("error", "Whoops! An error occurred during the process.")
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
    </>
  );
}
