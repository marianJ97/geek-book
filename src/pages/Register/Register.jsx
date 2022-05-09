import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords dont match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await fetch(`http://localhost:8800/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
              ref={username}
              placeholder="Username"
              className="loginInput"
              type="text"
            />
            <input
              required
              ref={email}
              placeholder="Email"
              className="loginInput"
              type="email"
            />
            <input
              required
              ref={password}
              placeholder="Password"
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              required
              ref={passwordAgain}
              placeholder="Password again"
              className="loginInput"
              type="password"
              minLength="6"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="loginRegisterButton"
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
