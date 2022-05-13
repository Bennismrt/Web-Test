import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Booking from "./components/Booking/Booking";
import ProtectedRoutes from "./components/Controller/ProtectedRoutes";
import Home from "./components/Home";

function App() {
  return (
      <Routes>
        {/* <Route element={<ProtectedRoutes/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/booking" element={<Booking/>}/>
        </Route> */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
  );
}

export default App;
