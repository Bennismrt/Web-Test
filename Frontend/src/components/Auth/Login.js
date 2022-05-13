import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Controller/AuthContext';
import AxiosAuth from '../Controller/AxiosAuth';
import Loading from './Loading';
import axios from '../Controller/ControllerInterceptors';
import useAuth from '../Controller/UseAuth';
import { useNavigate, useLocation} from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState (false);
  const [username, setUsername] = useState ();
  const [password, setPassword] = useState ();
  const [msg, setMsg] = useState ();
  const {setAuth} = useAuth ();
  const navigate = useNavigate ();
  const location = useLocation ();
  const from = location.state?.from?.pathname || "/home";


  const HandleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post ('/auth/login', {
        username: username,
        password: password,
      }, {
        withCredentials: true
      });
      
      setLoading (true);
      if (res.data && res.status === 200) {
        setMsg ('Login succesfully');
        setInterval(() => {
          navigate (from, {replace: true});
          setLoading (false);
        }, 2000);
      }
      const accessToken = res?.data?.accessToken;
      setAuth({ username, password, accessToken });
      
    } catch (error) {
      if(error.response.status === 401){
        setMsg(error.response.data);
      }
    }
  }

  return (
    <div className='w-full h-screen bg-slate-200 flex flex-col items-center justify-center' >
        <div className='w-4/6 h-3/6 flex flex-row max-w-screen-xl shadow-xl'>
            <div className='bg-cyan-500 w-3/6 bg-pages bg-center bg-cover flex flex-col items-center justify-center'>
              <h1 className='text-white opacity-100 text-2xl font-bold my-4 w-3/4 text-center'>Welcome Back,</h1>
              <p className='w-3/4 text-white text-xs text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <form className='bg-white w-3/6 flex flex-col justify-center items-center' onSubmit={HandleLogin}>
                <h1 className='text-3xl bold font-bold mb-3'>Let You Sign In</h1>
                <small>{msg}</small>
                <div className='flex flex-row items-center border-2 p-2 rounded w-3/4 mt-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value) } placeholder='Username' className='bg-transparent outline-none ml-2 w-full'/>
                </div>
                <div className='flex flex-row items-center border-2 p-2 rounded mt-4 w-3/4'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                    </svg>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-transparent outline-none ml-2 w-full'/>
                </div>
                <button disabled={loading} className='px-6 py-2 w-3/4 bg-cyan-500 rounded-lg mt-4 text-white flex flex-row items-center justify-center'>{loading && <Loading/>} Login</button>
                <h2 className='text-md mt-8'>Don't have an Account?</h2>
                <h2 className='text-md text-cyan-500 cursor-pointer'><Link to={'/register'}>Register</Link></h2>

            </form>
        </div>
    </div>
  )
}

export default Login