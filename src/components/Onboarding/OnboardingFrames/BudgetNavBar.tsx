import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import mixpanel from './../../../models/mixpanel'

const BudgetNavBar: React.FC = () => {
  let from_dashboard = localStorage.getItem("from_dashboard");
  const history = useHistory();
  return (
    <div>
      <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand
                    href="#home"
                    onClick={(e) => e.preventDefault()}
                    className="mr-2">
                    <img src="images/okane_new_logo.png" alt="BigCo Inc. logo" style={
                        {
                            width: "auto", 
                            height: "75px",
                            zIndex: "100"
                        }
                    }>
                    </img>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" navbar>
                        <Nav.Item>
                            <Nav.Link className="m-0">
                                <div onClick={() => {
                                    mixpanel.setIdentity().then(()=>{
                                        mixpanel.trackEvent("Reporting Issue")
                                    });
                                    window.open("https://docs.google.com/forms/d/e/1FAIpQLSckNca_00uTGbyrF6rlRDCYnnB5cvzXkZ1sI4czPxPUPxjQTA/viewform?usp=sf_link")
                                }
                            } className="no-icon">Report Issue</div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="m-0">
                                <div onClick={() => {
                                    mixpanel.setIdentity().then(()=>{
                                        mixpanel.trackEvent("Back to dashboard")
                                    });
                                    history.push("/dashboard");
                                    localStorage.clear();
                                }
                            } className="no-icon">Back to Dashboard</div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default BudgetNavBar