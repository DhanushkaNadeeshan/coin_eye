export default function HistoryView({ info, address }) {
  // check is send or get crypto
  const type = address === info.to ? "bg-green-500" : "bg-red-500";

  return (
    <div className="p-1 border-b border-blue-500">
      <span
        className={`
        relative 
        inline-flex 
        rounded-full 
        w-2 h-2 
        ${type} 
        mr-1`}
      ></span>
      <p className="text-slate-300 text-sm  text-sm flex justify-between border-b border-dotted border-blue-500 p-1">
        Value(ETH) : {info.value} | Block Number : {info.blockNumber} | Gas
        Price : {info.gasPrice}
      </p>
      <p className="text-slate-500 text-sm flex justify-between border-b border-dotted border-blue-500 p-1">
        <span>TX Hash:</span>
        <span>{info.txHash}</span>
      </p>
      <p className="text-slate-500 text-sm flex justify-between border-b border-dotted border-blue-500 p-1">
        <span>From</span>
        <span>{info.from}</span>
      </p>
      <p className="text-slate-500 text-sm flex justify-between border-b border-dotted border-blue-500 p-1">
        <span>To</span>
        <span>{info.to}</span>
      </p>

      <p className="text-slate-500 text-sm flex justify-between p-1">
        <span>Block Hash</span>
        <span>{info.blockHash}</span>
      </p>
    </div>
  );
}
