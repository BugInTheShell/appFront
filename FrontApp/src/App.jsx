import './App.css'
import Login from './pages/Login'
import Registro from './pages/Login/Components/Register'
import ForgotPass from './pages/Login/Components/ForgotPass'
import { useSelector } from 'react-redux'
import 'animate.css';
import image from "./assets/layered-waves-haikei.svg"

function App() {

  const view = useSelector((state) => state?.authView?.value);

  return (
    <>
      <div className="flex justify-center px-4">

        <div className={view == "Register" ? "animate__animated animate__bounceInLeft":"hidden"}>

          <Registro/>

        </div>

        <div className={view == "Login" ? "animate__animated animate__bounceInRight":"hidden"}>

          <Login/>

        </div>


        <div className={view == "ForgotPass" ? "":"hidden"}>

          <ForgotPass/>

        </div>

      </div>
    </>
  )
}

export default App
