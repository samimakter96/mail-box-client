import React, { useRef } from "react";
import "./SignupScreen.css";

const SignupScreen = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle sign up
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlDLbN-wEQpGYO1CDnnV-VbldFZDEpoR8`;

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
      console.log("user Signed Up Successfully");

      // clear input fields
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      confirmPasswordInputRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="shadow login-form">
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className="control">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className="control">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordInputRef}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary p-2 mt-2 form-control rounded"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignupScreen;
