import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../theme/Loader";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef();
  const securityQuestionRef = useRef();
  const anwserRef = useRef();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => {
          const securityQuestion = securityQuestionRef.current.value;
          const anwser = anwserRef.current.value;
          const data = { credential, securityQuestion, anwser };
          setLoading(true);
          axios
            .post("/api/user/signup/google", data)
            .then(({ data }) => {
              const { success } = data;
              if (success) {
                alert("Success,please try with login!");
                window.location.href = "/login";
              } else {
                const { message } = data;
                if (message.code === 11000) {
                  alert("User already there,please try with login!");
                }
              }
              setLoading(false);
            })
            .catch((err) => {
              alert("Account creation failed");
              setLoading(false);
              console.error(err);
            });
        },
      });

      google.accounts.id.renderButton(googleButtonRef.current, {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });
    }
  }, []);

  return (
    <div className="w-3/5 mt-24 2xl:mt-48 text-center bg-slate-700 mx-auto rounded-lg p-4  border border-slate-600">
      <h1 className="font-bold text-3xl text-cyan-500">Coin Eye</h1>
      <h1 className="font-bold  text-cyan-600">Create a new account</h1>
      <div className="w-4/6 mx-auto text-left">
        <p className="text-slate-300 my-2">Security Question :</p>

        {loading && <Loader />}
        <select
          className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500"
          ref={securityQuestionRef}
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

        <input
          className="
            w-full
            border-b-2
            bg-inherit
            text-slate-200
            border-slate-500
            px-2
            focus:outline-none
            focus:border-sky-500"
          ref={anwserRef}
        />
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
