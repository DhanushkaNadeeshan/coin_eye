import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequestCrypto } from "../../utils/slice/requestCryptoSlice";

export default function ViewRequestedCrypto({ data }) {
  const dispatch = useDispatch();

  const [requestStatus, setRequestStatus] = useState(false);

  const { senderAddress, receiverAddress, ETHValue, USDValue, createdAt, _id } =
    data;

  const cancelRequestETH = () => {
    const url = `/api/swap/ETH/request`;
    const sendData = {
      id: _id,
      status: "reject",
    };

    axios
      .put(url, sendData)
      .then(({ data }) => {
        if (data.success) {
          dispatch(removeRequestCrypto({ id: _id }));
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: Swap.js:46 ~ axios.post ~ error:", error);
      });
  };

  const sendRequestETH = () => {
    const url = `/api/swap/ETH/request`;
    const sendData = {
      id: _id,
      status: "accept",
    };

    axios
      .put(url, sendData)
      .then(({ data }) => {
        if (data.success) {
          setRequestStatus(true);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: Swap.js:46 ~ axios.post ~ error:", error);
      });
  };

  const pulse = requestStatus ? "animate-pulse" : "";

  return (
    <div className={`m-2 p-2  border-l bg-gray-800 border-red-500 ${pulse}`}>
      <div className="px-3">
        <p className="text-orange-500 ">
          <span className="text-blue-300 text-xs mr-2">
            Sender : {senderAddress}{" "}
          </span>
          <FontAwesomeIcon icon={faArrowRight} />
          <span className="text-green-300 text-xs mx-2">
            Receiver : {receiverAddress}
          </span>
          <span className="text-teal-400 text-sm mx-2">USD : {USDValue}$</span>
          <span className="text-red-200 text-sm mx-2">ETH : {ETHValue}</span>
        </p>
        <p className="text-slate-600 my-2 text-xs">Created : {createdAt}</p>
        <div className="flex justify-end">
          {requestStatus && (
            <>
              <p className="text-blue-300">Pending...</p>
            </>
          )}

          {!requestStatus && (
            <>
              <button
                className="mx-4 text-red-400 px-3 rounded hover:bg-slate-700"
                onClick={sendRequestETH}
              >
                Send
              </button>
              <button
                className="mx-4 text-blue-400 px-3 rounded hover:bg-slate-700"
                onClick={cancelRequestETH}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
