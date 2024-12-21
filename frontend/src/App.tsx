import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import PATHS from "./paths";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { appAction } from "./store/app/slice";
import { TEN_MINUTES } from "./constants";
import { isDay } from "./store/app/selectors";

function App() {
  const dispatch = useAppDispatch();
  const dayOrNight = useAppSelector(isDay);

  useEffect(() => {
    dispatch(appAction.checkTime());
    const intervalId = setInterval(() => {
      dispatch(appAction.checkTime());
    }, TEN_MINUTES);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className={`wrapper ${dayOrNight && "night"}`}>
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
