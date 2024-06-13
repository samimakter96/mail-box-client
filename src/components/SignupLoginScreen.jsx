import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupLoginScreen.css";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const SignupLoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModelHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    let url;
    if (isLogin) {
      // Handle Login
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlDLbN-wEQpGYO1CDnnV-VbldFZDEpoR8`;
    } else {
      // Handle sign up
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlDLbN-wEQpGYO1CDnnV-VbldFZDEpoR8`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      dispatch(login(data.idToken));
      setIsLoading(false);
      console.log("user Signed Up Successfully");

      // clear input fields
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      confirmPasswordInputRef.current.value = "";

      // after successfully logged in Navigate to welcome page
      navigate("/welcome");
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="shadow login-form">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            ref={emailInputRef}
          />
        </div>
        <div className="control">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="control">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            required
            ref={confirmPasswordInputRef}
          />
        </div>
        <div>
          {/* render the button when isLoading is false  */}
          {!isLoading && (
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary p-2 mt-2 form-control rounded"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {/* if isLoading is true then render this message */}
          {isLoading && <p>Sending request...</p>}

          <button
            type="button"
            className="toggle"
            onClick={switchAuthModelHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupLoginScreen;
