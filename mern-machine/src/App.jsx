import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/Home";
import Employeelist from "./components/Employeelist";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/Dashboard";
import Post from "./components/post/Post";

export default function App() {
  return (
    <>

    <Navbar />
   
   <Routes>

    <Route path="/" element={<Home /> } />
    <Route path='/post/:_id' element={<Post /> } />
    <Route path="/employeelist" element={<Employeelist />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard /> } />
   </Routes>

   

    </>
  )
}