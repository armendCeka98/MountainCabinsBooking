import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Loader />
    </>
  );
}

export default App;
