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

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await login(user.email, user.password);

    dispatch(
      accountAction.login({
        uid: response?.uid,
        email: response?.email,
        username: response?.username,
      })
    );
    setUser(initialState);
    navigate(PATHS.Home);
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
