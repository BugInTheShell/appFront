import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Registro from './pages/Login/Components/Register'
import ForgotPass from './pages/Login/Components/ForgotPass'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
      <Registro/>
      <ForgotPass/>
    </>
  )
}

export default App
