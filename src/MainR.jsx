
import { Routes, Route } from "react-router-dom";
import App from "./App";      
import Signup from "./Components/Signup";
import Login from "./Components/Login";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Main;
