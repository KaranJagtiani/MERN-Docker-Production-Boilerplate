import { Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Home from "./containers/Home/Home";
import About from "./containers/About/About";
import Login from "./containers/Login/Login";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="nav-heading">
              <NavLink exact to="/">
                AppName
              </NavLink>
            </Navbar.Brand>
            <Nav className="nav-links">
              <Nav.Link>
                <NavLink exact activeClassName="active" to="/">
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink exact activeClassName="active" to="/about">
                  About
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink exact activeClassName="active" to="/login">
                  Login
                </NavLink>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
