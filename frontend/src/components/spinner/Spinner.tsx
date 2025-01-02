import { ClockLoader } from "react-spinners";
import styles from "./spinner.module.css";
import { MAIN_YELLOW } from "../../constants/colors";

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <ClockLoader
        color={MAIN_YELLOW}
        size={80}
        speedMultiplier={7}
        aria-label="clock-loading"
      />
    </div>
  );
};

export default Spinner;
