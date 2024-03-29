import React, { useContext } from 'react';
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Messenger from './pages/messenger/Messenger';
import { AuthContext } from './context/AuthContext';

function App()  {
  const {user} = useContext(AuthContext)
  
  
  return(
        <BrowserRouter>
        <Routes>
        <Route
         path='/'
         element={user ? <Home/> : <Login/>}
         />
         <Route
         path='/login'
         element={user ? <Navigate to='/'/>  : <Login/>}
         />
        <Route
         path='/register'
         element={user ? <Navigate to='/'/>  : <Register/>}
         />
          <Route
         path='/messenger'
         element={!user ? <Navigate to='/'/>  : <Messenger/>}
         />
         <Route
         path='/profile/:username'
         element={user ? <Profile/>  : <Login/>}
         />
        </Routes>
        </BrowserRouter>
);

}

export default App;
