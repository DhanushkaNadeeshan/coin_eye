import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import data from "../../utils/questions.json";
import InputText from "../../theme/InputText";
import Button from "../../theme/Button";
import axios from "axios";
import { selectUser } from "../../utils/slice/userSlice";
import { useSelector } from "react-redux";

export default function Question() {
  const userSelector = useSelector(selectUser);

  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [question, setQuestion] = useState("");
  const [anwser, setAnwser] = useState("");
  const [failedAttempt, setFailedAttempt] = useState("");

  const securityQuestions = data.securityQuestions;

  useEffect(() => {
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = `${seconds}`.length === 1 ? `0${seconds}` : seconds;

  const foo = () => {
    const info = {
      id: userSelector.id,
      securityQuestion: question,
      anwser: anwser,
    };
    axios
      .post("/api/user/question", info)
      .then(({ data }) => {
        const { result } = data;
        if (result.success) {
        } else {
          if (result.satus === "block") {
            alert("You can't do TX");
          } else {
            setFailedAttempt(result.failedAttempt);
            alert(result.msg);
          }
        }

        console.log("🚀 ~ file: Question.js:16 ~ .then ~ rs:", result);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Question.js:20 ~ returnnewPromise ~ error:",
          error
        );
      });
  };

  // #:check

  return (
    <div className="px-4">
      <p className="text-center my-5 text-7xl text-blue-300">
        <FontAwesomeIcon icon={faLock} />
      </p>

      <p className="py-2 text-slate-400">Security Question</p>

      <select
        className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500"
        onChange={(e) => setQuestion(e.target.value)}
      >
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

      <InputText
        name="number"
        value={anwser}
        onChange={(e) => setAnwser(e.target.value)}
      />

      <div className="w-1/4 mt-4 mx-auto">
        <Button onClick={foo}>Check</Button>
      </div>

      <p className="pt-6 text-center text-red-400 text-2xl">
        {minutes} : {seconds}
      </p>
      {failedAttempt && (
        <p className="pt-6 text-center text-red-400 text-xl">
          Failed Attempt : {failedAttempt} / 3
        </p>
      )}
    </div>
  );
}
