import React,{useState,useContext, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import AuthContext from '../components/Controller/AuthContext';
import AxiosAuth from '../components/Controller/AxiosAuth';

const Navbar = ({Booking}) => {
  const [logout, setLogout] = useState("logout");
  const [username, setUsername] = useState('');
  const [id, setId] = useState();
  const [dropdownLogout, setDropdownLogout] = useState("dropdownLogout");
  const {auth, setAuth} = useContext (AuthContext);
  const axiosPrivate = AxiosAuth ();

  const PopupLogout = () => {
    if (logout === "logout"){
        setLogout("logoutActive");
    }else setLogout("Logout");
  }
  const DropdownLogout = () => {
    if (dropdownLogout === "dropdownLogout"){
        setDropdownLogout("dropdownLogoutActive");
    }else setDropdownLogout("dropdownLogout");
  }

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.get ('/auth/refresh-token');
      const decoded = jwt_decode (response.data.accessToken);
      setId (decoded.id);
    } catch (error) {
      console.error (error);
    }
  };

  useEffect (
    () => {
        refreshToken ();
        getUser ();
    },
    [id]
  );

  const getUser = async () => {
    try {
      const response = await axiosPrivate.get (`/user/getUser/${id}`);
      setUsername (response.data.username);
    } catch (error) {
      if (error.response.status === 500) {
      }
    }
  };

  const Logout = async () => {
    try {
      await axiosPrivate.delete ('/auth/logout');
      setAuth ({});
      window.location.replace ('/');
    } catch (error) {
      console.log (error);
    }
  };
  return (
    <div className='w-full bg-cyan-500 flex justify-center'>
        <nav className='max-w-screen-xl w-full py-6 flex flex-row justify-between'>
            <h1 className='text-2xl font-bold text-white pl-12'>Quartato</h1>
            <ul className='flex flex-row text-white text-md font-bold pr-12 items-center'>
                <li className='pr-6 cursor-pointer'><a href='/home'>Home</a></li>
                <li className='pr-6 cursor-pointer' onClick={Booking}>Booking</li>
                <div className='flex flex-row items-center space-x-4 p-2 border-2 rounded-lg relative w-32' onClick={DropdownLogout}>
                  <p className='w-16 text-ellipsis overflow-hidden whitespace-nowrap'>{username}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div className={dropdownLogout}>
                    <p className='p-2 hover:bg-slate-200 cursor-pointer w-32' onClick={PopupLogout}>Logout</p>
                  </div>
                </div>
            </ul>
        </nav>
        <div className={logout}>
                <div className='w-2/5 h-44 bg-cyan-500 flex flex-col justify-center items-center rounded-lg mt-56 space-y-8'>
                    <h1 className='font-bold text-lg text-white text-center'>Are you sure for Logout?</h1>
                    <div className='flex flex-row space-x-6'>
                        <button className='py-1 px-4 rounded-md text-white bg-orange-500' onClick={Logout}>Yes</button>
                        <button className='py-1 px-4 rounded-md text-white bg-red-500' onClick={() => setLogout("logout")}>Cancel</button>
                    </div>
                </div>
            </div>
    </div>
    
  )
}

export default Navbar