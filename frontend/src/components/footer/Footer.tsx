import styles from "./footer.module.scss";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__copy}>
        Copyright &copy; 2024 - {currentYear}
      </div>
    </div>
  );
};

export default Footer;
