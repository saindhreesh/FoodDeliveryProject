import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/SideBar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const URL = 'https://food-del-backend-f266.onrender.com';
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
          <Routes>
            <Route path='/add' element={<Add url={URL}/>} />
            <Route path='/list' element={<List url={URL}/>} />
            <Route path='/orders' element={<Orders url={URL}/>} />
          </Routes>
      </div>
    </div>
  )
}

export default App
