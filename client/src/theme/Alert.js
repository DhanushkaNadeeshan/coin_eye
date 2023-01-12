import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Alert({ children, action = true, closeHandle, confirmHandle }) {

    if (action) {
        return (
            <div className="
            fixed 
            bottom-6 
            right-4
            w-2/5 
            px-2 
            py-3 
            rounded
            border-2
            border-orange-500 
            bg-orange-900
            text-slate-200
            z-5">

                <p className="font-bold">  <FontAwesomeIcon icon={faTriangleExclamation} /></p>
                {children}

                <div className='flex justify-end'>
                    <button className="
                    mx-2 
                    font-bold
                    text-blue-300 
                    hover:bg-slate-200 
                    hover:text-blue-600 
                    px-3
                    text-sm
                    rounded-full 
                    "
                        onClick={confirmHandle}
                    >Confirm</button>
                    <button className="
                    text-sm
                    mx-2 
                    font-bold 
                    text-rose-300
                    hover:text-rose-600
                    hover:bg-slate-200 
                    px-3
                    rounded-full
                    "
                        onClick={closeHandle}
                    >Cancel</button>
                </div>

            </div>
        )
    }
}