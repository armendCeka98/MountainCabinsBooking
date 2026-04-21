import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Loader from "./components/Loader";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
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
