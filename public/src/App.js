import React from 'react';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import SetAvatar from './components/setAvatar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/setAvatar" element={<SetAvatar/>}/>
            <Route path="/" element={<Chat/>}/>
        </Routes>
    </BrowserRouter>
  )
}
