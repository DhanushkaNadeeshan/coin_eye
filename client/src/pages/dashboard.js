import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faWallet,
    faShuffle,
    faDollar,
    faBell,
    faGear
} from '@fortawesome/free-solid-svg-icons';
// custome
import ManuItem from '../components/MenuItem';

export default function Dashboard() {

    const [path, setPath] = useState('/');

    const handlingActive = () => {
        const url = window.location.pathname;
        setPath(url);
    }

    return (<>
        {/* top bar */}
        <nav className='w-full bg-opacity-60 backdrop-blur-lg fixed top-0 px-2 py-4 bg-gray-700 flex justify-end'>
            <p className='font-bold text-white'>
                <FontAwesomeIcon icon={faUser} className='mx-4 text-violet-700' />
                User Name
            </p>
        </nav>
        
        {/* side bar */}
        <div className='w-1/5 p-3 h-screen fixed bg-slate-800 flex flex-col'>
            {/* brand name */}
            <h1 className='font-bold mx-2 mt-2 mb-6 text-cyan-500 text-2xl'>Coin Eye</h1>
            {/* links */}
            <Link to="/" onClick={handlingActive}>
                <ManuItem path={path} url="/">
                    <p><FontAwesomeIcon icon={faWallet} className='mx-4' /> Wallet</p>
                </ManuItem>
            </Link>

            <Link to="/swap" onClick={handlingActive}>
                <ManuItem path={path} url='swap'>
                    <p><FontAwesomeIcon icon={faShuffle} className='mx-4' /> Swap</p>
                </ManuItem>
            </Link>
            <Link to="/topup" onClick={handlingActive}>
                <ManuItem path={path} url='topup'>
                    <p><FontAwesomeIcon icon={faDollar} className='mx-4' /> Topup</p>
                </ManuItem>
            </Link>
            <Link to="/notifications" onClick={handlingActive}>
                <ManuItem path={path} url='notifications'>

                    <p><FontAwesomeIcon icon={faBell} className='mx-4' />
                        Notifications
                    </p>
                    <div className='flex h-3 w-3'>
                        <span class="animate-ping absolute inline-flex w-2 h-2 rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full w-2 h-2 bg-red-500"></span>
                    </div>
                    {/* <span className=' px-2 mx-2 text-white bg-red-500 text-sm rounded'>1</span> */}
                </ManuItem>
            </Link>
            <Link to="/setting" onClick={handlingActive}>
                <ManuItem path={path} url='setting'>
                    <p><FontAwesomeIcon icon={faGear} className='mx-4' /> Setting</p>
                </ManuItem>
            </Link>

        </div>
        {/* main pages handling */}
        <div className='w-4/5 pt-16 px-4 float-right'>
            <Outlet />
        </div>
    </>)
}