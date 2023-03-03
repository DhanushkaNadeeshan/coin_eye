import { useState } from "react";
import Main from "./Main";
import Button from "../theme/Button";
import Modal from "../theme/Modal";
import InputText from "../theme/InputText";
import { useSelector } from "react-redux";
import { selectCards } from "../utils/slice/accountSlice";

export default function Topup() {
  const cardsList = useSelector(selectCards);
  const [statusModalAdd, setStatusModalAdd] = useState(false);
  const [statusModalUpdate, setStatusModalUpdate] = useState(false);

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

  return (
    <Main name="Topup">
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
          <Button type="warning" onClick={openModalUpdate}>Update</Button>
        </div>

        <div className="w-2/4 mx-auto my-5 rounded py-6 bg-slate-800 border-t border-slate-700">
          <div className="w-2/4 mx-auto">
            <p className="text-left font-bold text-slate-400">Bank</p>

            <select className="w-full">
              <option value="">Select a card</option>
              {cardsList.map((card, i) => {
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
      ></Modal>
      {/* Update or remove a card */}
      <Modal
        title="Update/Remove  card"
        action={statusModalUpdate}
        closeHandle={closeModalUpdate}
      ></Modal>
    </Main>
  );
}
