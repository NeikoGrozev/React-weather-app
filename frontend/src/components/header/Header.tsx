import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./header.module.css";
import PATHS from "../../paths";
import { APP_NAME } from "../../constants";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt={APP_NAME} />
        <div className={styles.appName}>{APP_NAME}</div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.button}>
          <Link to={PATHS.Home}>Home</Link>
        </div>
        <div className={styles.button}>
          <Link to={PATHS.SignUp}>Sign up</Link>
        </div>
        <div className={styles.button}>
          <Link to={PATHS.Login}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
