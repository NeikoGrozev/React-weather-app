import { useParams } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { searchAction } from "../../store/search/slice";

const GeoLocation = () => {
  const dispatch = useAppDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(searchAction.setDropdownOpen(false));
  }, [dispatch, key]);

  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default GeoLocation;
