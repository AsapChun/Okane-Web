import { Component } from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

type MyProps = {
  
}

type MyState = {
  
}

class HomeNavbar extends Component<MyProps, MyState> {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
              <Navbar.Brand
                href="#home"
                onClick={(e) => e.preventDefault()}
                className="mr-2"
              >
                <img src="images/okane_logo_128.png" alt="BigCo Inc. logo" style={
                  {
                    width: "55px", 
                    height: "55px",
                    borderRadius: "40px",
                  }
                }></img>

                {/* <div className="dashboard-title"> &nbsp;&nbsp;&nbsp;Okane</div> */}
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" navbar>
                <Nav.Item>
                  <Nav.Link
                    className="m-0"
                  >
                    <div onClick={(e) => window.location.href="/Home"} className="no-icon">Home</div>
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link
                    className="m-0"
                  >
                    <div onClick={(e) => window.location.href="/About"} className="no-icon">About Us</div>
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link
                    className="m-0"
                  >
                    <div onClick={(e) => window.location.href='/Privacy'} className="no-icon">Privacy Policy</div>
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link
                    className="m-0"
                    onClick={(e) =>e.preventDefault()}>
                    <span className="no-icon">Log In</span>
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
export default HomeNavbar