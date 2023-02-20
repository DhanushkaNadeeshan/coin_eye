import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/slice/userSlice";
import { setWalletDetails } from "../utils/slice/accountSlice";
import Loader from "../theme/Loader";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function Login() {
  const googleButtonRef = useRef();
  const dispatch = useDispatch();
  const [requiredLogin, setRequiredLogin] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const createSavingAccountBalance = (total, transactionBalance) => {
    total = parseFloat(total.$numberDecimal);
    transactionBalance = parseFloat(transactionBalance.$numberDecimal);
    return total == 0 ? 0 : total - transactionBalance;
  };

  const handleGoogle = (response) => {
    setLoading(true);
    const data = {
      credential: response.credential,
    };

    axios
      .post("/api/login/google", data)
      .then(({ data }) => {
        const { success } = data;
        console.log("🚀 ~ file: login.js:45 ~ .then ~ data", data);

        if (success) {
          let {
            name,
            email,
            picture,
            total_USD,
            t_account_USD,
            account,
            cards,
          } = data.user;
          let { total_ETH, t_account_ETH, wallet_address } = account[0];

          const accountDetails = {
            total_USD: parseFloat(total_USD.$numberDecimal),
            t_account_USD: parseFloat(t_account_USD.$numberDecimal),
            cards: cards,
            wallet_address: wallet_address,
            s_account_USD: createSavingAccountBalance(total_USD, t_account_USD),
            total_ETH: parseFloat(total_ETH.$numberDecimal),
            t_accountETH: parseFloat(t_account_ETH.$numberDecimal),
            s_accountETH: createSavingAccountBalance(total_ETH, t_account_ETH),
          };
          dispatch(setUser({ name, email, picture, loginStatus: true }));
          dispatch(setWalletDetails(accountDetails));
          // update login status
          setRequiredLogin(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  if (requiredLogin) {
    return (
      <div className="w-3/5 mt-24 2xl:mt-48 text-center bg-slate-700 mx-auto rounded-lg p-4  border border-slate-600">
        {loading && <Loader />}
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
  } else {
    return <Navigate to="/" replace={true} />;
  }
}
