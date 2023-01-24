import InputText from "../theme/InputText";
import GoogleButton from "../theme/GoogleButton";
import { Link } from "react-router-dom";

var securityQuestions = [
  "What is your mother's maiden name?",
  "What is your father's middle name?",
  "What is the name of your first pet?",
  "What is the name of the street you grew up on?",
  "What is your favorite childhood memory?",
  "What is the name of your favorite teacher?",
  "What is your favorite color?",
  "What is your favorite movie?",
  "What is your favorite book?",
  "What is your favorite music artist?",
  "What is your favorite food?",
  "What is your favorite hobby?",
  "What is your favorite sport?",
  "What is your favorite vacation destination?",
  "What is the name of your first school?",
  "What is the name of your first employer?",
  "What is your favorite web browser?",
  "What is your favorite social media platform?",
  "What is your favorite mobile device brand?",
  "What is your favorite operating system?",
];

export default function SingUp() {
  return (
    <div className="w-3/5 mt-24 2xl:mt-48 text-center bg-slate-700 mx-auto rounded-lg p-4  border border-slate-600">
      <h1 className="font-bold text-3xl text-cyan-500">Coin Eye</h1>
      <h1 className="font-bold  text-cyan-600">Create a new account</h1>
      <div className="w-4/6 mx-auto text-left">
        <p className="text-slate-300 my-2">Security Question :</p>
        <select
          className="
          w-full
          border-b-2
          bg-inherit
          text-slate-200
          border-slate-500
          px-2
          focus:outline-none
          focus:border-sky-500"
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
        <p className="text-slate-300 my-2">Anwser :</p>

        <InputText />

        <GoogleButton customeCss="mt-8 mx-auto" width="w-2/4">
          SignUp with Google
        </GoogleButton>
      </div>
      <p className="text-slate-400 my-4">
        Have an account? 
        <Link to="/login">
          <samp className="font-bold text-sky-600 hover:text-sky-300">
             login
          </samp>
        </Link>
      </p>
    </div>
  );
}
