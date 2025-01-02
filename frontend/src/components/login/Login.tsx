import { ChangeEvent, FormEvent, useState } from "react";
import { LoginUserProps } from "../../interfaces/LoginUserProps";
import { login } from "../../firebase/auth";
import { useAppDispatch } from "../../hooks";
import { accountAction } from "../../store/account/slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PATHS from "../../paths";
import style from "./login.module.css";
import { EMAIL, PASSWORD } from "../../constants/placeholders";
import { Link } from "react-router-dom";
import { LoginErrorProps } from "../../interfaces/LoginErrorProps";
import { appAction } from "../../store/app/slice";

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
    <div className={style.loginContainer}>
      <div className={style.loginBox}>
        <h2 className={style.title}>Login</h2>
        <p className={style.text}>Sign in to your account.</p>
        <form onSubmit={handleLogin} className={style.formContainer}>
          <div className={style.inputContainer}>
            <span className={style.icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              name={FormKeys.Email}
              value={user.email}
              onChange={onInputHandler}
              placeholder={EMAIL}
              className={style.input}
              required
            />
            {errors.email && <p className={style.error}>{errors.email}</p>}
          </div>
          <div className={style.inputContainer}>
            <span className={style.icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              name={FormKeys.Password}
              value={user.password}
              onChange={onInputHandler}
              placeholder={PASSWORD}
              className={style.input}
              required
            />
            {errors.password && (
              <p className={style.error}>{errors.password}</p>
            )}
          </div>
          <button type="submit" className={style.button}>
            Login
          </button>
          <p className={style.registrationLink}>
            If you don't have profile click <Link to={PATHS.SignUp}>here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
