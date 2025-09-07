import { FaCog } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setInicio , setArchivos, setUsuarios ,setSharedMe } from "./headerSlice";
import { useNavigate } from "react-router";
import { FaHome, FaFileAlt, FaUsers, FaShareAlt , FaSignOutAlt } from 'react-icons/fa';
const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar shadow-sm">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><button onClick={() => dispatch(setInicio())}> <FaHome /> Inicio</button></li>
                <li><button onClick={() => dispatch(setArchivos())}><FaFileAlt /> Mis archivos</button></li>
                <li><button onClick={() => dispatch(setUsuarios())}><FaUsers /> Usuarios</button></li>
                <li><button onClick={() => dispatch(setSharedMe())}><FaShareAlt /> Compartidos conmigo</button></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl">AboutAnApp</a>
        </div>
        <div className="navbar-end">
            <button className="btn btn-error" onClick={() => navigate("/")}>
                <FaSignOutAlt className="text-white" />
            </button>
        </div>
        </div>
  )
}

export default Header