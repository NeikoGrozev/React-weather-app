import styles from "./search.module.scss";

const Search = () => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search for a city..."
        className={styles.search__input}
      />
      <button className={styles.search__button}>Search</button>
    </div>
  );
};

export default Search;
