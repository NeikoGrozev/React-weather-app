import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { accountAction } from "../../store/account/slice";
import { getUser, isLoggedIn } from "../../store/account/selectors";
import { logout } from "../../firebase/auth";
import { APP_NAME } from "../../constants";
import PATHS from "../../paths";
import logo from "../../assets/logo.png";
import styles from "./header.module.scss";

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
    <div className={styles.header}>
      <div className={styles.header__logoContainer}>
        <img className={styles.header__logo} src={logo} alt={APP_NAME} />
        <div className={styles.header__appName}>
          <Link to={PATHS.Home}>{APP_NAME}</Link>
        </div>
      </div>
      <div className={styles.header__menu}>
        <div className={styles.header__button}>
          <Link to={PATHS.Home}>Home</Link>
        </div>
        {!isAuthenticated && (
          <div className={styles.header__button}>
            <Link to={PATHS.SignUp}>Sign up</Link>
          </div>
        )}
        {!isAuthenticated && (
          <div className={styles.header__button}>
            <Link to={PATHS.Login}>Login</Link>
          </div>
        )}
        {isAuthenticated && (
          <div className={styles.header__button}>{user.username}</div>
        )}
        {isAuthenticated && (
          <div
            className={styles.header__button}
            onClick={() => onClickLogoutHandler()}
          >
            <Link to={""}>Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
