import { getAuth, signOut } from "firebase/auth";
import { Navbar, Container, Nav} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import "./Navbars.css"
import auth from './../../models/auth'
import mixpanel from './../../models/mixpanel'

type MyProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
  plaidLinked: string
}

const googleAuth = getAuth();

const Navbars : React.FC<MyProps> = (
  {setIsAuth, plaidLinked}, 
  ) => {
  const history = useHistory();
  function goToSetting() {
    mixpanel.setIdentity().then(()=>{
      mixpanel.trackEvent("Go to settings")
    });
    history.push('/settings')
  }

  function logOut() {
    signOut(googleAuth).then(() => {
      // Sign-out successful.
      setIsAuth(false);
      auth.logout(() => {
        return;
      });
      console.log("Sign out successful");
      mixpanel.setIdentity().then(()=>{
        mixpanel.trackEvent("logout")
      });
      localStorage.clear()
      history.push("/login");

    }).catch((error) => {
      // An error happened.
      console.error("Logout Error:", error)
    });
  }
  
    return (
      <>
        <Navbar bg="light">
          <Container fluid>
            <div className="d-flex justify-content-center align-items-center">
              <Navbar.Brand
                href="#home"
                onClick={(e) => e.preventDefault()}
              >
                <img src="images/okane_new_logo.png" alt="BigCo Inc. logo" style={
                  {
                    width: "auto", 
                    height: "75px",
                    zIndex: "100"
                  }
                }></img>

                <div className = "vertical"></div>

                <div className="dashboard-title"> &nbsp;&nbsp;&nbsp;Okane Dashboard</div>
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
                  <Nav.Link className="m-0">
                    <div onClick={() => {
                      localStorage.setItem("oauth_state", "plaid_onboarding");
                      localStorage.setItem("from_dashboard", "true");
                      mixpanel.setIdentity().then(()=>{
                        mixpanel.trackEvent("Add Accounts")
                      });
                      history.push("/onboarding");
                      }
                    } className="no-icon text-nowrap">Add Accounts</div>
                  </Nav.Link>
                </Nav.Item>
                {/* {plaidLinked === "true" ? 
                  <Nav.Item>
                    <Nav.Link className="m-0">
                      <div onClick={() => {
                        localStorage.setItem("oauth_state", "budget_setup_onboarding");
                        localStorage.setItem("from_dashboard", "true");
                        mixpanel.setIdentity().then(()=>{
                          mixpanel.trackEvent("Edit Budget")
                        });
                        history.push("/onboarding");
                        }
                      } className="no-icon text-nowrap">Edit Budget</div>
                    </Nav.Link>
                  </Nav.Item>:<></>
                } */}
                <Nav.Item>
                  <Nav.Link className="m-0">
                    <div onClick={() => {
                        mixpanel.setIdentity().then(()=>{
                            mixpanel.trackEvent("Reporting Issue")
                        });
                        window.open("https://docs.google.com/forms/d/e/1FAIpQLSckNca_00uTGbyrF6rlRDCYnnB5cvzXkZ1sI4czPxPUPxjQTA/viewform?usp=sf_link");
                    }
                  } className="no-icon text-nowrap">Report Issue</div>
                  </Nav.Link>
                </Nav.Item>
                {
                  plaidLinked === "true" ?
                  <Nav.Item>
                    <Nav.Link className="m-0">
                      <div onClick={() => goToSetting()} className="no-icon text-nowrap">Settings</div>
                    </Nav.Link>
                  </Nav.Item> : <></>
                }
                <Nav.Item>
                  <Nav.Link
                    className="m-0"
                    onClick={(e) =>logOut()}>
                    <div className="no-icon text-nowrap">Log out</div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
}

export default Navbars

