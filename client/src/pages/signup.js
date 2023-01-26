import { useState, useEffect, useRef } from "react";
import InputText from "../theme/InputText";
import { Link } from "react-router-dom";
import axios from "axios";
const GOOGLE_CLIENT_ID = "39907080221-v82h7l8nn6qn027ul1fag3ajfksgh9oe.apps.googleusercontent.com";
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

const useFetch = (url, question, anwser) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    const data = {
      credential: response.credential,
      question,
      anwser,
    };

    axios
      .post(url, data)
      .then(({ data }) => {
        const { success } = data;
        if (success) {
        } else {
          const { message } = data;
          if (message.code === 11000) {
            alert("User already there,please try with login!");
          }
        }
      })
      .catch((err) => console.error(err));
  };
  return { loading, error, handleGoogle };
};

export default function SingUp() {
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [anwser, setAnwser] = useState("");
  const googleButtonRef = useRef();

  const { handleGoogle, loading, error } = useFetch(
    "/api/signup/google",
    securityQuestion,
    anwser
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(googleButtonRef.current, {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });
    }
  }, [googleButtonRef.current]);

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
          onChange={(e) => setSecurityQuestion(e.target.value)}
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

        <InputText onChange={(e) => setAnwser(e.target.value)} />
        <div
          className="my-2 flex justify-center"
          ref={googleButtonRef}
          data-text="signup_with"
        ></div>
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
