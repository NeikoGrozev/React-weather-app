import { ClockLoader } from "react-spinners";
import { MAIN_YELLOW } from "../../constants/colors";
import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
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
