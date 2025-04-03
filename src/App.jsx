import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pagesof/Home.jsx';
import Auth from './pagesof/Auth.jsx';
import AdminDashboard from './pagesof/AdminDashboard.jsx';
import UserDashboard from './pagesof/UserDashboard.jsx';
import Courses from './pagesof/Courses.jsx';
import AboutPage from './pagesof/About.jsx';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { authContext } from './context/ContextApi.jsx';
import OurTeam from './components/OurTeam.jsx';
import TrackOrder from './components/TrackOrder.jsx';
import AdminOrders from './components/AdminOrders.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { auth } = useContext(authContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admindash" element={auth ? <AdminDashboard /> : <Auth />} />
        <Route path="/userdash" element={auth ? <UserDashboard /> : <Auth />} />
        <Route path="/courses" element={auth ? <Courses /> : <Auth />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/track-order" element={auth ? <TrackOrder /> : <Auth />} />
        <Route path="/admin-orders" element={auth ? <AdminOrders /> : <Auth />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;