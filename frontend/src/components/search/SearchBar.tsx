import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchAction } from "../../store/search/slice";
import styles from "./searchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AutocompleteResult from "./autocomplateResult/AutocompleteResult";
import { useNavigate } from "react-router-dom";
import PATHS from "../../paths";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.search.query);
  const autocompleteResult = useAppSelector(
    (state) => state.search.autocompleteResult
  );
  const isDropdownOpen = useAppSelector((state) => state.search.isDropdownOpen);

  const onSubmitHandler = () => {
    onSearch();
    dispatch(searchAction.setDropdownOpen(false));
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
      dispatch(searchAction.setDropdownOpen(false));
      navigate(PATHS.SearchResult);
    }
  };

  const onChangeQueryHandler = (queryString: string) => {
    dispatch(searchAction.setQuery(queryString));
  };

  useEffect(() => {
    dispatch(searchAction.setAutocompleteResult([]));

    if (query.length > 3) {
      fetch(`/city/autocomplete?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(searchAction.setDropdownOpen(true));
          dispatch(searchAction.setAutocompleteResult(data));
        })
        .catch((err) => {
          dispatch(searchAction.setAutocompleteResult([]));
          console.log(err);
        });
    } else {
      dispatch(searchAction.setDropdownOpen(false));
    }
  }, [dispatch, query]);

  const onSearch = () => {
    fetch(`/city/search-locations?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(searchAction.setDropdownOpen(false));
        dispatch(searchAction.setSearchResult(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickInputHandler = () => {
    dispatch(searchAction.setDropdownOpen(true));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        dispatch(searchAction.setDropdownOpen(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className={styles.search} ref={searchContainerRef}>
      <div className={styles.search__inputContainer}>
        <input
          type="text"
          value={query}
          placeholder="Search for a city..."
          className={styles.search__input}
          onChange={(e) => onChangeQueryHandler(e.target.value)}
          onKeyDown={(e) => onKeyDownHandler(e)}
          onClick={() => onClickInputHandler()}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.search__button}
          onClick={onSubmitHandler}
        />
      </div>
      {!!autocompleteResult.length && isDropdownOpen && (
        <div className={styles.search__autocompleteContainer}>
          {autocompleteResult?.map((item) => (
            <AutocompleteResult key={item.Key} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
