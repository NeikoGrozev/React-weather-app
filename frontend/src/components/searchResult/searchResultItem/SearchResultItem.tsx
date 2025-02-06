import { Link } from "react-router-dom";
import { SearchResultProps } from "../../../interfaces/SearchResultProps";
import styles from "./searchResultItem.module.scss";

const SearchResultItem = ({
  Key,
  LocalizedName,
  AdministrativeArea,
  Country,
  GeoPosition,
}: SearchResultProps) => {
  return (
    <div className={styles.searchResult}>
      <Link to={`/geo-location/${Key}`}>
        <div className={styles.searchResult__left}>
          <div className={styles.searchResult__localizedName}>
            {LocalizedName}
          </div>
          <div>
            {AdministrativeArea.EnglishName}, {Country.EnglishName}
          </div>
        </div>
        <div className={styles.searchResult__right}>
          <div className={styles.searchResult__rightTitle}>Coordinates:</div>
          <div className={styles.searchResult__geoPosition}>
            Latitude:{" "}
            <span className={styles.searchResult__geoPositionValue}>
              {GeoPosition.Latitude}
            </span>
          </div>
          <div className={styles.searchResult__geoPosition}>
            Longitude:{" "}
            <span className={styles.searchResult__geoPositionValue}>
              {GeoPosition.Longitude}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResultItem;
