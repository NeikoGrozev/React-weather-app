import logo from "../../assets/logo.png";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="" />
      <div className={styles.appName}>Weather App</div>
    </div>
  );
};

export default Header;
