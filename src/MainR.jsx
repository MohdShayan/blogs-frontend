
import { Routes, Route } from "react-router-dom";
import App from "./App";      
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./pages/Home";
import ExploreTrends from "./pages/ExploreTrends";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<ExploreTrends />} />
      
    </Routes>
  );
};

export default Main;
