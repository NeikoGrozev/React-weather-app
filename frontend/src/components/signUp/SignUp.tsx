import { ChangeEvent, FormEvent, useState } from "react";
import { SignUpUserProps } from "../../interfaces/SignUpUserProps";
import { register } from "../../firebase/auth";
import { useAppDispatch } from "../../hooks";
import { accountAction } from "../../store/account/slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import PATHS from "../../paths";
import style from "./signUp.module.css";
import {
  CONFIRM_PASSWORD,
  EMAIL,
  PASSWORD,
  USERNAME,
} from "../../constants/placeholders";
import { Link } from "react-router-dom";

const FormKeys = {
  Username: "username",
  Email: "email",
  Password: "password",
};

const initialState: SignUpUserProps = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
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

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  return (
    <div className={style.registerContainer}>
      <div className={style.registerBox}>
        <h2 className={style.title}>Registration</h2>
        <p className={style.text}>
          Create your account. It's free and only takes a minute.
        </p>
        <form onSubmit={handleRegister} className={style.formContainer}>
          <div className={style.inputContainer}>
            <span className={style.icon}>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              name={FormKeys.Username}
              value={user.username}
              onChange={onInputHandler}
              placeholder={USERNAME}
              className={style.input}
              required
            />
          </div>
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
          <div className={style.inputContainer}>
            <span className={style.icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              name={FormKeys.Password}
              value={user.password}
              onChange={onInputHandler}
              placeholder={CONFIRM_PASSWORD}
              className={style.input}
              required
            />
          </div>
          <button type="submit" className={style.button}>
            Sign Up
          </button>
          <p className={style.loginLink}>
            If you already have profile click <Link to={PATHS.Login}>here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
