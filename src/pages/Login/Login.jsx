import { useContext } from "react";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    navigate("/home");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Logo</h3>
          <span className="loginDesc">
            Connect with friends and the world around you
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              required
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
            />
            <input
              required
              minLength="6"
              placeholder="Password"
              className="loginInput"
              type="password"
              ref={password}
            />
            <button type="submit" className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button
              onClick={() => navigate("/register")}
              className="loginRegisterButton"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a new account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
