import { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import "./styles/navbar.css";

const NavBar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  const [eventActive, setEventActive] = useState();

  const eventClickHandler = () => {};

  const auth = useContext(AuthContext);

  const firstName = auth.firstName;

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container id="container">
          <Navbar.Brand
            style={{ fontSize: "17px" }}
            id="navbarBrand"
            href={`#home`}
          >
            {firstName ? "Hi, " + firstName : ""}
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Events" menuVariant="light">
              <Nav.Link id="ce" href={`/create-an-event`}>
                Create an event
              </Nav.Link>
              <Nav.Link id="se" href={`/show-events`}>
                Show events
              </Nav.Link>
            </NavDropdown>
            <Nav.Link href={`#`}>About</Nav.Link>
            <Nav.Link onClick={logoutHandler} href="/">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
