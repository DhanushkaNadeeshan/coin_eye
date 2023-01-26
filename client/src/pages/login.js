import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GOOGLE_CLIENT_ID = "39907080221-v82h7l8nn6qn027ul1fag3ajfksgh9oe.apps.googleusercontent.com";

const useFetch = (url) => {
  let navigate = useNavigate();
  const handleGoogle = async (response) => {
    const data = {
      credential: response.credential,
    };

    axios
      .post(url, data)
      .then(({ data }) => {
        const { success } = data;
        if (success) {
          return navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };
  return { handleGoogle };
};

export default function Login() {
  const googleButtonRef = useRef();
  const { handleGoogle } = useFetch("/api/login/google");

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
  }, []);

  return (
    <div className="w-3/5 mt-24 2xl:mt-48 text-center bg-slate-700 mx-auto rounded-lg p-4  border border-slate-600">
      <h1 className="font-bold text-3xl text-cyan-500">Coin Eye</h1>
      <h1 className="font-bold  text-cyan-600">Login in to the wallet</h1>

      <div
        className="my-8 flex justify-center"
        ref={googleButtonRef}
        data-text="signup_with"
      ></div>

      <p className="text-slate-400">Create a new account</p>
      <Link to="/signup">
        <samp className="font-bold text-sky-600 hover:text-sky-300">
          Sing Up
        </samp>
      </Link>
    </div>
  );
}
