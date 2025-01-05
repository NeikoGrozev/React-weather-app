import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { appAction } from "../../store/app/slice";
import { accountAction } from "../../store/account/slice";
import { register } from "../../firebase/auth";
import {
  CONFIRM_PASSWORD,
  EMAIL,
  PASSWORD,
  USERNAME,
} from "../../constants/placeholders";
import PATHS from "../../paths";
import { SignUpUserProps } from "../../interfaces/SignUpUserProps";
import { SignUpErrorProps } from "../../interfaces/SignUpErrorProps";
import style from "./signUp.module.scss";

const FormKeys = {
  Username: "username",
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirmPassword",
};

const initialState: SignUpUserProps = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState<SignUpErrorProps>({});

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const newErrors: SignUpErrorProps = {};

    // Username validation
    if (!user.username) {
      newErrors.email = "Username is required.";
    } else if (user.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }

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

    // Confirm password validation
    if (!user.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    dispatch(appAction.setSpinnerIsVisible(true));
    const response = await register(user.email, user.password, user.username);

    dispatch(
      accountAction.login({
        uid: response?.uid,
        email: response?.email,
        username: response?.username,
      })
    );
    setUser(initialState);
    navigate(PATHS.Home);
    dispatch(appAction.setSpinnerIsVisible(false));
  };

  return (
    <div className={style.signUp}>
      <div className={style.signUp__box}>
        <h2 className={style.signUp__title}>Registration</h2>
        <p className={style.signUp__text}>
          Create your account. It's free and only takes a minute.
        </p>
        <form onSubmit={handleRegister} className={style.signUp__form}>
          <div className={style.signUp__inputContainer}>
            <span className={style.signUp__icon}>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              name={FormKeys.Username}
              value={user.username}
              onChange={onInputHandler}
              placeholder={USERNAME}
              className={style.signUp__input}
              required
            />
            {errors.username && (
              <p className={style.signUp__error}>{errors.username}</p>
            )}
          </div>
          <div className={style.signUp__inputContainer}>
            <span className={style.signUp__icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              name={FormKeys.Email}
              value={user.email}
              onChange={onInputHandler}
              placeholder={EMAIL}
              className={style.signUp__input}
              required
            />
            {errors.email && (
              <p className={style.signUp__error}>{errors.email}</p>
            )}
          </div>
          <div className={style.signUp__inputContainer}>
            <span className={style.signUp__icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              name={FormKeys.Password}
              value={user.password}
              onChange={onInputHandler}
              placeholder={PASSWORD}
              className={style.signUp__input}
              required
            />
            {errors.password && (
              <p className={style.signUp__error}>{errors.password}</p>
            )}
          </div>
          <div className={style.signUp__inputContainer}>
            <span className={style.signUp__icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              name={FormKeys.ConfirmPassword}
              value={user.confirmPassword}
              onChange={onInputHandler}
              placeholder={CONFIRM_PASSWORD}
              className={style.signUp__input}
              required
            />
            {errors.confirmPassword && (
              <p className={style.signUp__error}>{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" className={style.signUp__button}>
            Sign Up
          </button>
          <p className={style.signUp__loginLink}>
            If you already have profile click <Link to={PATHS.Login}>here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
