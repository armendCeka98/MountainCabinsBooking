import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Loader from "./components/Loader";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminLogin from "./pages/Admin/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Loader />
    </>
  );
}

export default App;
