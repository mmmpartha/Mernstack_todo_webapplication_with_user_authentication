import { useState } from 'react'
import './App.css'
import Home from './Home';
import Login from "./Auth/Login"
import Signup from './Auth/signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home /> }></Route>
        <Route path="/register" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
