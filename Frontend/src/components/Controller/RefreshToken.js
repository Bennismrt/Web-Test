import axios from './ControllerInterceptors';
import useAuth from './UseAuth';

const RefreshToken = () => {
  const {setAuth} = useAuth ();

  const refresh = async () => {
    const response = await axios.get ('/auth/refresh-token', {
      withCredentials: true,
    });
    setAuth (prev => {
      return {...prev, accessToken: response.data.accessToken};
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default RefreshToken;
