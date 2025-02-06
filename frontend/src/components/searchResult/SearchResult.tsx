import { useAppSelector } from "../../hooks";
import SearchBar from "../search/SearchBar";
import SearchResultItem from "./searchResultItem/SearchResultItem";
import styles from "./searchResult.module.scss";

const SearchResult = () => {
  const searchResults = useAppSelector((state) => state.search.searchResult);
  return (
    <div className={styles.searchResult}>
      <SearchBar />
      <div className={styles.searchResult__items}>
        {searchResults?.map((item) => (
          <SearchResultItem key={item.Key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
