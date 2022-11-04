import React, { useState } from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import './Frame1.css';
import mixpanel from './../../../models/mixpanel'

interface PropsInterface  {
    hideComponent: (name:string) => void
}

// let isNextClicked = false;

const Frame1: React.FC<PropsInterface> = (
    props: PropsInterface
) => {
    const [isNextClicked, setIsNextedClicked] = useState(false);
    const { hideComponent } = props;

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsNextedClicked(true);    
        const button: HTMLButtonElement = event.currentTarget;
        if (button.name === "Next") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Onboarding Frame 2")
            })
            setTimeout(function(){
                hideComponent("showHideFrame2");
            }, 0)
        }
    };
    
    return(
        <div>
            {mixpanel.trackEvent("Onboarding Started")}
            <Navbar bg="light" expand="lg">
                <Container fluid>
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
                        }>
                        </img>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container align-content= "center">
                <Row >
                    <Col md={3} sm={3} xs={3} style ={{top:"150px", minWidth: "250px"}}>
                    </Col>
                    <Col id = "contentContainer" md = {6} sm={6} xs={6} className={`${isNextClicked ? " mainContainer " : "mainContainer"}`} style ={{top:"150px", minWidth: "500px"}}> 
                        <Row >
                            <div className="circle" style= {{background: '#2D3A6F'}} ></div>
                            <div className="circle" style = {{left: "10px"}} ></div>
                            <div className="circle" style = {{left: "20px"}} ></div>
                            <div className="circle" style = {{left: "30px"}} ></div>
                            <div className="circle" style = {{left: "40px"}} ></div>
                        </Row>
                        <Row  style ={{marginTop:"5px"}}>
                            <div className='BoldHeader'>
                                Welcome to Okane
                            </div>
                            <div className='SecondaryHeader'>
                                We are a Chrome Extension that visualizes your finances as you browse, one click away
                            </div> <br/>
                            <button className = "buttonDiv"onClick={buttonHandler} style ={{marginTop:"25px"}} name="Next">
                                <div className='button-text'>Next</div>
                            </button>
                        </Row> 
                   </Col>
                   <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}>
                    </Col>
                </Row>
                <Row>
                <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}></Col>
                <Col id = "imageContainer" md = {6} sm={6} xs={6} className={`${isNextClicked ? " mainContainerImg " : "mainContainerImg"}`} style ={{top:"125px", left: "25px", minWidth: "500px"}}>
                    <img className = "okaneIcon" src="images/okane_logo.png"></img>
                </Col>
                <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Frame1