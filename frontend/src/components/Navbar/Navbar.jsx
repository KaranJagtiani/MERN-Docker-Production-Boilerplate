import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";

import Home from "../../containers/Home/Home";
import About from "../../containers/About/About";
import Login from "../../containers/Login/Login";
import Register from "../../containers/Register/Register";
import Profile from "../../containers/Profile/Profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/fontawesome-free-solid";

import "./Navbar.scss";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  return (
    <>
      <div className="nav-bar">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="nav-heading">
              <NavLink to="/">AppName</NavLink>
            </Navbar.Brand>
            <Nav className="nav-links">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/about"
              >
                About
              </NavLink>
              {isLoggedIn && (
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/profile"
                >
                  Profile
                </NavLink>
              )}
              {isLoggedIn && (
                <NavLink
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                  }}
                >
                  <FontAwesomeIcon className="logout-icon" icon={faPowerOff} />
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/register"
                >
                  Register
                </NavLink>
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        {isLoggedIn && <Route path="profile" element={<Profile />} />}
        {!isLoggedIn && <Route path="login" element={<Login />} />}
        {!isLoggedIn && <Route path="register" element={<Register />} />}
      </Routes>
    </>
  );
};

export default NavBar;
