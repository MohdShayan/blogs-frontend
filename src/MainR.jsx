import { Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./pages/Home";
import ExploreTrends from "./pages/ExploreTrends";
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./Components/SingleBlog";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./authContext";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";

const Main = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <ExploreTrends />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <AllBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <ProtectedRoute>
              <SingleBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <CreateBlog/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/myblogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Main;
