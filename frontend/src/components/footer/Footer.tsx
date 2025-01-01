import styles from "./footer.module.css";
const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.copy}>Copyright &copy; 2024 - {currentYear}</div>
    </div>
  );
};

export default Footer;
