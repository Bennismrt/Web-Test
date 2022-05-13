import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../Controller/ControllerInterceptors';
import Loading from './Loading';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  
  const HandleRegister = async(e) => {
    e.preventDefault();
    try {
      const api = await axios.post('/auth/register', {
          "username": name,
          "email": email,
          "password": password,
          "confPassword": confirmPassword 
        });
        setLoading(true)
        if(api.data && api.status === 201) {
          setMsg("Registered succesfully")
        }
        setInterval(() => {
          setLoading(false)
          window.location.replace("/")
        }, 3000);
      } catch (error) {
        setMsg(error.response.data)
      }
  }

  return (
    <div className='w-full h-screen bg-slate-200 flex flex-col items-center justify-center' >
        <form onSubmit={HandleRegister} className='w-4/6 h-3/6 flex flex-row max-w-screen-xl shadow-xl'>
            <div className='bg-cyan-500 w-3/6 bg-pages bg-center bg-cover backdrop-blur-sm bg-cyan-500 bg-opacity-95 flex flex-col items-center justify-center'>
              <h1 className='text-white opacity-100 text-2xl font-bold my-4 w-3/4 text-center'>Quartato BarberShop</h1>
              <p className='w-3/4 text-amber-50 font-bold text-xs text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div className='bg-white w-3/6 flex flex-col justify-center items-center'>
                <h1 className='text-3xl bold font-bold mb-3'>Let You Sign Up</h1>
                <small>{msg}</small>
                <div className='flex flex-row items-center border-2 p-2 rounded w-3/4 mt-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <input type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} className='bg-transparent outline-none ml-2 w-full'/>
                </div>
                <div className='flex flex-row items-center border-2 p-2 rounded w-3/4 mt-3'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                    </svg>
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='bg-transparent outline-none ml-2 w-full'/>
                </div>
                <div className='flex flex-row items-center border-2 p-2 rounded mt-4 w-3/4'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                    </svg>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-transparent outline-none ml-2 w-full'/>
                </div>
                <div className='flex flex-row items-center border-2 p-2 rounded mt-4 w-3/4'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                    </svg>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='bg-transparent outline-none ml-2 w-full'/>
                </div>
                <button disabled={loading} className='px-6 py-2 w-3/4 bg-cyan-500 rounded-lg mt-4 text-white flex flex-row items-center justify-center'>{loading && <Loading/>} Register</button>
                <h2 className='text-md mt-8'>Already have an Account?</h2>
                <h2 className='text-md text-cyan-500 cursor-pointer'><Link to={'/'}>Login</Link></h2>
            </div>
        </form>
    </div>
  )
}

export default Register