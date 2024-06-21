import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary p-3 w-100">
        <div className="d-flex align-items-center">
          <p className="fw-bold fst-italic fs-3 mb-0">
            Welcome to your mail box!!!
          </p>
        </div>
        <button className="btn btn-outline-primary" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className="mt-4">
        <Link to="/compose" className="btn btn-primary mb-2">
          Compose Email
        </Link>
        <Link to="/inbox" className="btn btn-secondary mb-2 ms-2">
          View Inbox
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
