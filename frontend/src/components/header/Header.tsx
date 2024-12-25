import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./header.module.css";
import PATHS from "../../paths";
import { APP_NAME } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { accountAction } from "../../store/account/slice";
import { getUser, isLoggedIn } from "../../store/account/selectors";
import { logout } from "../../firebase/auth";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(isLoggedIn);
  const user = useAppSelector(getUser);

  const onClickLogoutHandler = async () => {
    await logout();
    dispatch(accountAction.logout());
    navigate(PATHS.Home);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt={APP_NAME} />
        <div className={styles.appName}>
          <Link to={PATHS.Home}>{APP_NAME}</Link>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.button}>
          <Link to={PATHS.Home}>Home</Link>
        </div>
        {!isAuthenticated && (
          <div className={styles.button}>
            <Link to={PATHS.SignUp}>Sign up</Link>
          </div>
        )}
        {!isAuthenticated && (
          <div className={styles.button}>
            <Link to={PATHS.Login}>Login</Link>
          </div>
        )}
        {isAuthenticated && (
          <div className={styles.button}>{user.username}</div>
        )}
        {isAuthenticated && (
          <div className={styles.button} onClick={() => onClickLogoutHandler()}>
            <Link to={""}>Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
