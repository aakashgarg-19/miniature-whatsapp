import React from 'react';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import SetAvatar from './components/setAvatar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import axios from "axios";

export default function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:5000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);
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
