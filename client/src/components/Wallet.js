import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { convertUSD } from "../utils/app";
// custom
import Main from "./Main";
import HistoryView from "./HistoryView";
import {
  selectETHBalance,
  selectUSDBalance,
  selectWalletAddress,
} from "../utils/slice/accountSlice";

import useTransactionAPI from "../hooks/transaction";
// import Button from "../theme/Button";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Wallet() {
  const walletAddress = useSelector(selectWalletAddress);
  const ETHBalance = useSelector(selectETHBalance);
  const USDBalance = useSelector(selectUSDBalance);

  const dataETH = {
    labels: ["Transaction Account" ,"Saving Account", ],
    datasets: [
      {
        label: "# ETH",
        data: [ETHBalance.transactionAccountETH, ETHBalance.savingAccountETH],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataUsd = {
    labels: ["Transaction Account" ,"Saving Account", ],
    datasets: [
      {
        label: "$",
        data: [convertUSD(USDBalance.transactionAccountUSD), convertUSD(USDBalance.savingAccountUSD)],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const { dataTX, isLoading } = useTransactionAPI(walletAddress);

  return (
    <Main name="Wallet">
      <div className="grid grid-cols-2 gap-16">
        {/* area of ETH  balance showing*/}
        <div className="p-3 border-b-4 border-slate-500 ">
          <div className="text-center">
            <p className="font-bold  text-blue-500">Available crypto balance</p>
            <img
              className="w-16 mx-auto m-2"
              src="img/ethereum.png"
              alt="ethereum logo"
            ></img>
            {/* showing grand total in balance */}
            <p className="text-slate-200 text-xl">
              {ETHBalance.totalETH} <samp className="text-blue-700">ETH</samp>
            </p>
          </div>
          {/* show account details */}
          <div className="flex justify-between text-slate-500">
            <p>Transaction account</p>
            <p>{ETHBalance.transactionAccountETH} (ETH)</p>
          </div>
          <div className="flex justify-between text-slate-500">
            <p>Saving account</p>
            <p>{ETHBalance.savingAccountETH} (ETH)</p>
          </div>
          <div className="mt-8 flex justify-around font-bold">
            <div>
              <p className="text-center text-orange-500 text-2xl">
                <FontAwesomeIcon icon={faDownLong} />
              </p>
              <button className="text-orange-500">Top Up</button>
            </div>
            <div>
              <p className="text-center text-green-500 text-2xl">
                <FontAwesomeIcon icon={faUpLong} />
              </p>
              <button className="text-green-500">Cash Out</button>
            </div>
          </div>
        </div>
        {/* area of usd balance showing */}
        <div className="p-3 border-b-4 border-slate-500 ">
          <div className="text-center">
            <p className="font-bold  text-blue-500">Available usd balance</p>
            <img
              className="w-16 mx-auto m-4"
              src="img/usd.png"
              alt="usd logo"
            ></img>
            {/* showing grand total in balance */}
            <p className="text-slate-200 text-xl">
              {convertUSD(USDBalance.totalUSD)}{" "}
              <samp className="text-amber-200">USD</samp>
            </p>
          </div>
          {/* show account details */}
          <div className="flex justify-between text-slate-500">
            <p>Transaction account</p>
            <p>{convertUSD(USDBalance.transactionAccountUSD)} (USD)</p>
          </div>
          <div className="flex justify-between text-slate-500">
            <p>Saving account</p>
            <p>{convertUSD(USDBalance.savingAccountUSD)} (USD)</p>
          </div>
          <div className="mt-8 flex justify-around font-bold">
            <div>
              <p className="text-center text-orange-500 text-2xl">
                <FontAwesomeIcon icon={faDownLong} />
              </p>
              <button className="text-orange-500">Top Up</button>
            </div>
            <div>
              <p className="text-center text-green-500 text-2xl">
                <FontAwesomeIcon icon={faUpLong} />
              </p>
              <button className="text-green-500">Cash Out</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex">
        <div className="p-2 w-3/5">
          <p className="font-bold text-slate-200">History</p>
          <div className="py-3">
            {isLoading && (
              <p className="text-slate-400 text-center">Loading TX...</p>
            )}
            {!isLoading &&
              dataTX.map((infoTX, i) => {
                return (
                  <HistoryView info={infoTX} key={i} address={walletAddress} />
                );
              })}

            {!isLoading && dataTX.length === 0 && (
              <p className="text-slate-600 text-center">
                History data isn't available
              </p>
            )}
          </div>
        </div>
        <div className="p-2 w-2/5">
          <p className="font-bold text-slate-200 text-center">Statistic</p>
          <div className="w-4/6 mx-auto my-2 p-2 rounded border border-blue-600">
            <p className="font-bold text-slate-200 text-center">ETH</p>
            <Pie data={dataETH} />
          </div>
          <div className="w-4/6 mx-auto my-2 p-2  rounded border  border-yellow-600">
            <p className="font-bold text-slate-200 text-center">USD</p>
            <Pie data={dataUsd} />
          </div>
        </div>
      </div>
    </Main>
  );
}
