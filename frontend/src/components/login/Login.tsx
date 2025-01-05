import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { appAction } from "../../store/app/slice";
import { accountAction } from "../../store/account/slice";
import { login } from "../../firebase/auth";
import { EMAIL, PASSWORD } from "../../constants/placeholders";
import PATHS from "../../paths";
import { LoginUserProps } from "../../interfaces/LoginUserProps";
import { LoginErrorProps } from "../../interfaces/LoginErrorProps";
import styles from "./login.module.scss";

const FormKeys = {
  Email: "email",
  Password: "password",
};

const initialState: LoginUserProps = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState<LoginErrorProps>({});

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const newErrors: LoginErrorProps = {};

    // Email validation
    if (!user.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    dispatch(appAction.setSpinnerIsVisible(true));
    const response = await login(user.email, user.password);

    if (!response) {
      navigate(PATHS.Login);
      setErrors({ password: "Invalid email or password." });
    } else {
      dispatch(
        accountAction.login({
          uid: response?.uid,
          email: response?.email,
          username: response?.username,
        })
      );
      setUser(initialState);
      navigate(PATHS.Home);
    }

    dispatch(appAction.setSpinnerIsVisible(false));
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__box}>
        <h2 className={styles.login__title}>Login</h2>
        <p className={styles.login__text}>Sign in to your account.</p>
        <form onSubmit={handleLogin} className={styles.login__form}>
          <div className={styles.login__inputContainer}>
            <span className={styles.login_icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              name={FormKeys.Email}
              value={user.email}
              onChange={onInputHandler}
              placeholder={EMAIL}
              className={styles.login__input}
              required
            />
            {errors.email && (
              <p className={styles.login__error}>{errors.email}</p>
            )}
          </div>
          <div className={styles.login__inputContainer}>
            <span className={styles.login__icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              name={FormKeys.Password}
              value={user.password}
              onChange={onInputHandler}
              placeholder={PASSWORD}
              className={styles.login__input}
              required
            />
            {errors.password && (
              <p className={styles.login__error}>{errors.password}</p>
            )}
          </div>
          <button type="submit" className={styles.login__button}>
            Login
          </button>
          <p className={styles.login__registrationLink}>
            If you don't have profile click <Link to={PATHS.SignUp}>here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
