import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import PATHS from "./paths";
import styles from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { appAction } from "./store/app/slice";
import { TEN_MINUTES } from "./constants";
import { isDay, isSpinnerVisible } from "./store/app/selectors";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { accountAction } from "./store/account/slice";
import { serializeUser } from "./firebase/firebaseHelper";
import { UserProps } from "./interfaces/UserProps";
import Spinner from "./components/spinner/Spinner";
import SearchResult from "./components/searchResult/SearchResult";
import GeoLocation from "./components/geoLocation/GeoLocation";

function App() {
  const dispatch = useAppDispatch();
  const dayOrNight = useAppSelector(isDay);
  const showSpinner = useAppSelector(isSpinnerVisible);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(accountAction.login(serializeUser(currentUser as UserProps)));
    });

    return () => unsubscribe();
  }, [dispatch, auth]);

  useEffect(() => {
    dispatch(appAction.checkTime());
    const intervalId = setInterval(() => {
      dispatch(appAction.checkTime());
    }, TEN_MINUTES);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className={`${styles.app} ${dayOrNight ? styles.night : styles.day}`}>
      <Header />
      <div className={styles.app__wrapper}>
        <Routes>
          <Route path={PATHS.Home} element={<Home />} />
          <Route path={PATHS.SignUp} element={<SignUp />} />
          <Route path={PATHS.Login} element={<Login />} />
          <Route path={PATHS.SearchResult} element={<SearchResult />} />
          <Route path={PATHS.GeoLocation} element={<GeoLocation />} />
        </Routes>
      </div>
      <Footer />
      {showSpinner && <Spinner />}
    </div>
  );
}

export default App;
