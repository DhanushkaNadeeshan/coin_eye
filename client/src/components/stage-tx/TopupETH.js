import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import data from "../../utils/questions.json";
import InputText from "../../theme/InputText";
import Button from "../../theme/Button";

export default function TopupETH(params) {
  const [askQuestion, setAskQuestion] = useState(true);

  const securityQuestions = data.securityQuestions;

  if (askQuestion) {
    return (
      <div className="px-4">
        <p className="text-center my-5 text-7xl text-blue-300">
          <FontAwesomeIcon icon={faLock} />
        </p>

        <p className="py-2 text-slate-400">Security Question</p>

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

        <p className="py-2 text-slate-400">Anwser</p>

        <InputText name="number" />

        <div className="w-1/4 mt-4 mx-auto">
          <Button>Check</Button>
        </div>

        <p className="pt-6 text-center text-red-400 text-2xl">Timeout 2.0</p>
      </div>
    );
  } else {
    return <></>;
  }
}
