import SearchBar from "../search/SearchBar";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <SearchBar />
    </div>
  );
};

export default Home;
