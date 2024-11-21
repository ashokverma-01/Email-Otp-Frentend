import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../components/auth/logout.jsx";

const Header = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    setIsModalVisible(false);
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ position: "fixed", width: "100%" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CFS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <div className="form-control me-2">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/register"
                >
                  Signup
                </Link>
              </div>
              <div className="form-control me-2">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/login"
                >
                  login
                </Link>
              </div>
              <div className="form-control me-2">
                <span
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={showModal}
                >
                  Logout
                </span>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Logout
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Header;
