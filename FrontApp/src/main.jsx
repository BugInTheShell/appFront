import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.js'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Inicio from './pages/Dashboard/index.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inicio" element={<Inicio />}/>
    </Routes>
    </Provider>
  </BrowserRouter>
)
