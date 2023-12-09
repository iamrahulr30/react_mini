import './styles/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import BreedDetails from './pages/BreedDetials';
import Login from './pages/Login';
import SignUp from './pages/signUp';
import Navbar from './pages/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import { useContext } from 'react';
import Profile from './pages/Profile';

function App() {

  const  { currentUser }  = useAuthContext()


  return (
        <div className="main">
          <div className="main-nav">
            <Navbar />
          </div>
          <div className="content">
            <Routes>
            <Route exact path="/" element={<Home /> } />
            <Route exact path="/login" element={<Login /> } />
            <Route exact path="/signup" element={<SignUp /> } />
            <Route exact path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/breed/:id" element={currentUser ? <BreedDetails /> : <Navigate to="/login" />} />
            

            </Routes>
          </div>
        </div>
        
  );
}

export default App;
