import React from "react";
import GoogleButton from "../theme/GoogleButton";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="w-3/5 mt-24 2xl:mt-48 text-center bg-slate-700 mx-auto rounded-lg p-4  border border-slate-600">
      <h1 className="font-bold text-3xl text-cyan-500">Coin Eye</h1>
      <h1 className="font-bold  text-cyan-600">Login in to the wallet</h1>

      <GoogleButton customeCss="my-8 mx-auto" width="w-2/4">
        SignIn with Google
      </GoogleButton>

      <p className="text-slate-400">Create a new account</p>
      <Link to="/signup">
        <samp className="font-bold text-sky-600 hover:text-sky-300">
          Sing Up
        </samp>
      </Link>
    </div>
  );
}
