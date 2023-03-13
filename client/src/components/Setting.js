import { useState } from "react";
import Main from "./Main";
import Modal from "../theme/Modal";
import Button from "../theme/Button";
import InputText from "../theme/InputText";
import data from "../utils/questions.json";
import Question from "./stage-tx/QuestionSetting";

export default function Setting() {
  const securityQuestions = data.securityQuestions;

  const [statusModalQuestion, setStatusModalQuestion] = useState(false);

  const openModalQuestion = () => {
    setStatusModalQuestion(true);
  };

  const closeModalQuestion = () => {
    setStatusModalQuestion(false);
  };

  const close = (status, callBack) => {
    closeModalQuestion();
    
    if (status) {
      callBack();
    }
  };

  const foo = () => {
    alert("call back");
  };

  return (
    <Main name="Setting">
      <div className="bg-slate-800 p-4 ">
        <p className="border-b text-blue-500 border-blue-500">
          Reset the question
        </p>
        <div className="p-4">
          <p className="py-2 text-blue-400">Security Question (New):</p>

          <select className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500">
            <option value="" className="text-slate-900">
              Select a question
            </option>

            {securityQuestions.map((data, i) => (
              <option value={data} className="text-slate-900" key={i}>
                {data}
              </option>
            ))}
          </select>

          <p className="py-2 text-blue-400">Anwser (New)</p>

          <InputText name="number" />

          <div className="flex justify-end">
            <div className="w-32 m-4">
              <Button onClick={openModalQuestion}>Save</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 p-4 my-4 ">
        <p className="border-b text-blue-500 border-blue-500">Recovery</p>
        <div className="p-4">
          <div className="w-64 my-4 mx-auto ">
            <Button type="warning">Request recovery</Button>
          </div>

          <div className="flex justify-end">
            <div className="w-32 m-4">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 my-4 ">
        <p className="border-b text-red-500 border-red-800">See private key</p>
        <div className="p-4">
          <div className="w-64 my-4 mx-auto ">
            <Button type="error">Request my private key</Button>
          </div>
          <div className="w-4/5 my-4 mx-auto ">
            <p className="text-red-400 text-center">
              Warning: If your crypto private key is leaked, your funds are at
              risk of being stolen. Take immediate action to secure your
              accounts and transfer your funds to a new address. Do not share
              your private key with anyone and regularly monitor your account
              for any suspicious activity.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 my-4 ">
        <p className="border-b text-red-500 border-red-800">
          My private key is leaked
        </p>
        <div className="p-4">
          <div className="w-64 my-4 mx-auto ">
            <Button>Quickly transfer to new account</Button>
          </div>
          <div className="w-4/5 my-4 mx-auto ">
            <p className="text-blue-200 text-center">
              Warning: Clicking "Create New Account and Transfer All Crypto"
              transfers available funds only. No guarantee of stolen money
              recovery.
            </p>
          </div>
        </div>
      </div>
      <Modal
        title="Security"
        action={statusModalQuestion}
        closeHandle={closeModalQuestion}
      >
        <Question closeModal={close} callBack={foo} />
      </Modal>
    </Main>
  );
}
