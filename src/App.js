import React from 'react';
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
function App() {
    return(
        <BrowserRouter>
        <Routes>
        <Route
         path='/'
         element={<Home/>}
         />
         <Route
         path='/login'
         element={<Login/>}
         />
        <Route
         path='/register'
         element={<Register/>}
         />
         <Route
         path='/profile/:username'
         element={<Profile/>}
         />
        </Routes>
        </BrowserRouter>
);

}

export default App;
