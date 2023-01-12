import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
// custom
import Main from "./Main";
import HistoryView from "./HistoryView";
// import Button from "../theme/Button";
export default function Wallet() {


    return (
        <Main name="Wallet">
            <div className="grid grid-cols-2 gap-16">
                {/* area of ETH  balance showing*/}
                <div className="p-3 border-b-4 border-slate-500 ">
                    <div className="text-center">
                        <p className="font-bold  text-blue-500">Available crypto balance</p>
                        <img className="w-16 mx-auto m-2" src="img/ethereum.png" alt="ethereum logo"></img>
                        {/* showing grand total in balance */}
                        <p className="text-slate-200 text-xl">101,000 <samp className="text-blue-700">ETH</samp></p>
                    </div>
                    {/* show account details */}
                    <div className="flex justify-between text-slate-500">
                        <p>Transaction account</p>
                        <p>1,000</p>
                    </div>
                    <div className="flex justify-between text-slate-500">
                        <p>Saving account</p>
                        <p>100,000</p>
                    </div>
                    <div className="mt-8 flex justify-around font-bold">
                        <div>
                            <p className='text-center text-orange-500 text-2xl'><FontAwesomeIcon icon={faDownLong} /></p>
                            <button className="text-orange-500">Top Up</button>
                        </div>
                        <div>
                            <p className='text-center text-green-500 text-2xl'><FontAwesomeIcon icon={faUpLong} /></p>
                            <button className="text-green-500">Cash Out</button>
                        </div>
                    </div>

                </div>
                {/* area of usd balance showing */}
                <div className="p-3 border-b-4 border-slate-500 ">
                    <div className="text-center">
                        <p className="font-bold  text-blue-500">Available usd balance</p>
                        <img className="w-16 mx-auto m-4" src="img/usd.png" alt="usd logo"></img>
                        {/* showing grand total in balance */}
                        <p className="text-slate-200 text-xl">101,000 <samp className="text-amber-200">USD</samp></p>
                    </div>
                    {/* show account details */}
                    <div className="flex justify-between text-slate-500">
                        <p>Transaction account</p>
                        <p>1,000</p>
                    </div>
                    <div className="flex justify-between text-slate-500">
                        <p>Saving account</p>
                        <p>100,000</p>
                    </div>
                    <div className="mt-8 flex justify-around font-bold">
                        <div>
                            <p className='text-center text-orange-500 text-2xl'><FontAwesomeIcon icon={faDownLong} /></p>
                            <button className="text-orange-500">Top Up</button>
                        </div>
                        <div>
                            <p className='text-center text-green-500 text-2xl'><FontAwesomeIcon icon={faUpLong} /></p>
                            <button className="text-green-500">Cash Out</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='mt-8 flex'>
                <div className='p-2 w-3/5'>
                    <p className='font-bold text-slate-200'>History</p>
                    <div className='py-3'>
                        <HistoryView description="send money => 234234" time="2 hours ago"/>
                        <HistoryView description="send money => 234234" time="2 hours ago"/>
                        <HistoryView description="send money => 234234" time="2 hours ago"/>
                    </div>
                </div>
                <div className='p-2 w-2/5'>
                    <p className='font-bold text-slate-200 text-center'>Statistic</p>
                </div>
            </div>
        </Main>
    )
}