import React from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mixpanel from './../../../models/mixpanel';
import './Frame6.css';


interface PropsInterface  {
    hideComponent: (name:string) => void
}

const Frame6: React.FC<PropsInterface> = (
    props: PropsInterface
) => {
    const history = useHistory();
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // Sign out user
        localStorage.setItem( 'authenticated', "true" );
        mixpanel.setIdentity().then(()=>{
            mixpanel.trackEvent("Done with onboarding")
        })
        history.push("/dashboard")
    }
    return(
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
                </Container>
            </Navbar>
            <Container fluid align-content= "center">
                <Row className="justify-content-md-center flex-nowrap">
                    <Col className="mainContainerFrame6" md ="auto" justify-content-center style ={{top:"50px", boxShadow:'-4px 4px 10px rgba(0,0,0,0.5)'}}>
                        <img src= 'images/toolbar.gif' alt='none' style= {
                            {   
                                width:'auto', 
                                height:'400px', 
                                background: '1px solid #C4C4C4', 
                                boxSizing:'border-box',
                                border: '1px solid lightgrey',
                                boxShadow:'-4px 4px 10px rgba(0,0,0,0.5)',
                                borderRadius: '5px'
                            }
                        }>
                        </img>
                    </Col >
                    <Col md ="auto">
                    </Col>
                    <Col className = "mainContainerFrame2" md ="4" style ={{top:"50px", minWidth: "400px", height: "275px"}}> 
                        <Container fluid="md">
                            <Row >
                                <div className="circle" ></div>
                                <div className="circle" style = {{left: "10px"}} ></div>
                                <div className="circle" style = {{left: "20px", background: '#2D3A6F'}} ></div>
                            </Row>
                            <Row style ={{marginTop:"15px"}}>
                                <div className='BoldHeader'>
                                    Congratulations! You have successfully set up your account
                                </div>
                                <div className='SecondaryHeaderFrame6'>
                                    <b>Please pin Okane to your toolbar</b>. You will be able to add more accounts in the dashboard. Happy browsing!
                                </div>
                                <button className = "buttonDiv" style ={{marginTop:"10px"}} onClick={buttonHandler}>
                                    <div className='button-text'>Go To Dashboard</div>
                                </button>
                            </Row> 
                            <Row className = "mainContainerImgFrame2 flex-nowrap" style ={{}}>
                                <Col lg={11} md={11} sm={11} xs={11}></Col>
                                <Col lg={1} md={1} sm={1} xs={1}>
                                    <img className = "okaneIcon" src="images/okane_logo.png" alt=""></img>
                                </Col>
                            </Row> 
                        </Container>     
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Frame6