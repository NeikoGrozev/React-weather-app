import Search from "../search/Search";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Search />
    </div>
  );
};

export default Home;
