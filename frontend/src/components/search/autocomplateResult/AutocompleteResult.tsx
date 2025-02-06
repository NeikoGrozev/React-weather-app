import { Link } from "react-router-dom";
import { AutocompleteProps } from "../../../interfaces/AutocompleteProps";
import styles from "./autocompleteResult.module.scss";

const AutocompleteResult = ({
  Key,
  LocalizedName,
  AdministrativeArea,
  Country,
}: AutocompleteProps) => {
  return (
    <div className={styles.autocomplete}>
      <Link to={`/geo-location/${Key}`}>
        <span className={styles.autocomplete__cityName}>{LocalizedName}</span>,{" "}
        {AdministrativeArea.LocalizedName}, {Country.LocalizedName}
      </Link>
    </div>
  );
};

export default AutocompleteResult;
