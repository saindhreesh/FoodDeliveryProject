import React, { useContext }  from 'react';
import Navbar from './components/Navbar/navbar.jsx'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Homepage.jsx';
import Cartpage from './pages/Cart/Cartpage.jsx';
import PlaceOrderpage from './pages/Placeorder/PlaceOrderpage.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopup from './components/Login/LoginPopup.jsx';
import { StoreContext } from './Context/StoreContext.jsx';
import Orders from './pages/Orders/Orders.jsx';

const App = () => {
  const {showLogin , token} = useContext(StoreContext);
  return (
    <>
      {showLogin ? <LoginPopup />: <></>}
      <div className='app'>
       
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/orders' element={<Orders token={token}/>}/>
          <Route path='/cart' element={<Cartpage />} />
          <Route path='/order' element={<PlaceOrderpage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;
