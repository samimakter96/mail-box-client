import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Welcome = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom border-secondary p-3">
      <div className="d-flex align-items-center">
        <p className="fw-bold fst-italic fs-3 mb-0">
          Welcome to your mail box!!!
        </p>
      </div>
      <button className="btn btn-outline-primary" onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Welcome;
