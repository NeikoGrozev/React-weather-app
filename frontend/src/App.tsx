import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import PATHS from "./paths";
import "./App.css";

function App() {
  return (
    <div className={`wrapper night`}>
      <Header />
      <Routes>
        <Route path={PATHS.Home} element={<Home />} />
        <Route path={PATHS.SignUp} element={<SignUp />} />
        <Route path={PATHS.Login} element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
