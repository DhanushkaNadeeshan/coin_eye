import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Message({}) {
  return (
    <div
      className="
              fixed
              w-full
              h-full
              backdrop-blur-sm
              grid 
              place-items-center
              z-30
             "
    >
      <div className="px-8 py-4 bg-slate-800 border-t-4 border-blue-700 scale-in-center w-3/6 h-64">
        <p className="text-slate-300 border-b border-red-400 font-medium text-xl">
          Title
        </p>

        <div className="text-center">
          <FontAwesomeIcon
            className="text-4xl mt-6 text-blue-300 animate-bounce"
            icon={faCircleInfo}
          />
          <p className="text-slate-200">Is Do it?</p>

          <button className="mt-4 bg-blue-400 px-4 rounded-full font-bold hover:bg-blue-500">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmMessage({ children }) {
 

  return (
    <div
      className="
              fixed
              w-full
              h-full
              backdrop-blur-sm
              grid 
              place-items-center
              z-30
             "
    >
   
        <div className="px-8 py-4 bg-slate-800 border-t-4 border-blue-700 scale-in-center w-3/6 h-64">
          <p className="text-slate-300 border-b border-red-400 font-medium text-xl">
            Title
          </p>

          <div className="text-center">
            <FontAwesomeIcon
              className="text-4xl mt-6 text-red-300 animate-bounce"
              icon={faQuestionCircle}
            />
            <p className="text-slate-200">Is Do it?</p>

            <div className="w-2/4 mx-auto flex justify-between ">
              <button className="mt-4 bg-blue-400 w-32 rounded-full font-bold hover:bg-blue-500">
                Ok
              </button>
              <button className="mt-4 bg-red-400 w-32 rounded-full font-bold hover:bg-red-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
   
    </div>
  );
}
