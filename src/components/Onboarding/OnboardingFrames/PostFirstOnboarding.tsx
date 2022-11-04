import React from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import mixpanel from './../../../models/mixpanel';
import BudgetNavBar from './BudgetNavBar';

interface PropsInterface  {
  hideComponent: (name:string) => void
}

const PostFirstOnboarding: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  const history = useHistory();
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      localStorage.setItem( 'authenticated', "true" );
      mixpanel.setIdentity().then(()=>{
          mixpanel.trackEvent("Done with first part of onboarding")
      })
      const button: HTMLButtonElement = event.currentTarget;
      if (button.name === "Accounts") {
        mixpanel.setIdentity().then(()=>{
            mixpanel.trackEvent("Connect Financial Accounts")
        })
        props.hideComponent("showHidePlaidOnboarding");
      } else if (button.name === "Dashboard") {
        mixpanel.setIdentity().then(()=>{
            mixpanel.trackEvent("Checking Dashboard")
        })
        history.push("/dashboard");
      }
  };
  return(
      <div>
          <BudgetNavBar></BudgetNavBar>
          {/* <Navbar bg="light" expand="lg">
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
              </Container>
          </Navbar> */}
          <Container align-content= "center">
                <Row>
                    <Col md={3} sm={3} xs={3} style ={{top:"150px", minWidth: "250px"}}>
                    </Col>
                    <Col id = "contentContainer" md = {6} sm={6} xs={6} className="mainContainer" style ={{top:"150px", minWidth: "500px"}}> 
                        <Row >
                            <div className="circle"></div>
                            <div className="circle" style={{left: "10px"}}></div>
                            <div className="circle" style={{left: "20px"}}></div>
                            <div className="circle" style={{left: "30px"}}></div>
                            <div className="circle" style={{left: "40px", background: '#2D3A6F'}}></div>
                        </Row>
                        <Row  style ={{marginTop:"5px"}}>
                            <div className='BoldHeader'>
                                Congratulations! One more step to go...
                            </div>
                            <div className='SecondaryHeader'>
                                Lets replace the demo data with your data. Click <b>Connect Accounts</b> to proceed! You may also choose to remain in demo mode for now, and connect your accounts later
                            </div> <br/>
                            <button className="buttonDiv" onClick={buttonHandler} style={{marginTop:"25px"}} name="Accounts">
                                <div className='button-text'>Connect Accounts</div>
                            </button>
                            <button className="buttonDiv" onClick={buttonHandler} style={{background: '#d3d3d3', marginTop:"25px", marginLeft: "20px", outline: "none", border: "none"}} name="Dashboard">
                                <div className='button-text'>Go To Dashboard</div>
                            </button>
                        </Row> 
                   </Col>
                   <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}>
                    </Col>
                </Row>
                <Row>
                <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}></Col>
                <Col id = "imageContainer" md = {6} sm={6} xs={6} className="mainContainerImg" style ={{top:"125px", left: "25px", minWidth: "500px"}}>
                    <img className = "okaneIcon" src="images/okane_logo.png"></img>
                </Col>
                <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}></Col>
                </Row>
            </Container>
      </div>
  )
}

export default PostFirstOnboarding