import Main from "./Main";
import Button from "../theme/Button";
import InputText from "../theme/InputText";

export default function Topup() {
  return (
    <Main name="Topup">
      <div className="text-center">
        <p className="font-bold  text-blue-500">Available crypto balance</p>
        <img
          className="w-16 mx-auto m-4"
          src="img/usd.png"
          alt="usd logo"
        ></img>
        <p className="text-slate-200 text-xl">
          101,000 <samp className="text-amber-200">USD</samp>
        </p>

        <div className="w-2/4 flex mx-auto justify-between text-slate-500">
          <p>Transaction account</p>
          <p>1,000</p>
        </div>
        <div className="w-2/4 flex mx-auto justify-between text-slate-500">
          <p>Saving account</p>
          <p>1,000</p>
        </div>
        <div className="w-3/6 m-2 grid grid-cols-2 gap-3 mx-auto">
          <Button>Add a card</Button>
          <Button type="warning">Update</Button>
        </div>
        <div className="w-2/4 mx-auto my-5 rounded py-6 bg-slate-800 border-t border-slate-700">
          <div className="w-2/4 mx-auto">
            <p className="text-left font-bold text-slate-400">Bank</p>
            <select className="w-full">
              <option>Ma</option>
            </select>
          </div>
          <div className="w-2/4 mx-auto">
            <p className="text-left font-bold text-slate-400">Amount</p>
            <InputText />
          </div>
          <div className="w-1/4 mt-4 mx-auto">
            <Button>Topup</Button>
          </div>
        </div>
      </div>
    </Main>
  );
}
