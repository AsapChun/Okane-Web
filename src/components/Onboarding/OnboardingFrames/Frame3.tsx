import React from 'react';
import { Col, Container, Row, Navbar} from 'react-bootstrap';
import mixpanel from './../../../models/mixpanel'
import './Frame3.css';

interface PropsInterface  {
    hideComponent: (name:string) => void
}

const Frame3: React.FC<PropsInterface> = (
    props: PropsInterface
) => {
    const { hideComponent } = props;

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const button: HTMLButtonElement = event.currentTarget;
        if (button.name === "Next") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Move to end of first onboarding")
            })
            hideComponent("showEndOfFirstOnboarding");
        } else if (button.name === "Previous") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Return to Onboarding Frame 2")
            })

            hideComponent("showHideFrame2");
        }
    };

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
                    <Col md ="auto" justify-content-center style ={{top:"50px"}}>
                        <img src= 'images/Frame_3_Image.png' alt='none' style= {
                            {   
                                width:'540px', 
                                height:'450px', 
                                background: '1px solid #C4C4C4', 
                                boxSizing:'border-box',
                                border: '1px solid lightgrey',
                                boxShadow: '-5px 4px 4px rgba(0, 0, 0, 0.08)',
                                borderRadius: '5px'
                            }
                        }>
                        </img>
                    </Col >
                    <Col md ="auto">

                    </Col>
                    <Col className = "mainContainerFrame3" md ="4" style ={{top:"50px", minWidth: "400px", height: "275px"}}> 
                        <Container fluid="md">
                            <Row >
                                {/* <div className="circle" ></div>
                                <div className="circle" style = {{left: "10px"}} ></div>
                                <div className="circle" style = {{background: '#2D3A6F', left: "20px"}} ></div>
                                <div className="circle" style = {{left: "30px"}} ></div>
                                <div className="circle" style = {{left: "40px"}} ></div> */}
                            </Row>
                            <Row style ={{marginTop:"5px"}}>
                                <div className='BoldHeader'>
                                    When you click on me...
                                </div>
                                <div className='SecondaryHeader'>
                                    I'll show you how a <b>potential purchase affects your budget!</b> To do this, we use <a href = "https://plaid.com/how-it-works-for-consumers/">Plaid</a>, the same provider Venmo, Truebill, and others use to talk to your financial accounts. We'll set that up shortly...
                                </div>
                                <button name="Previous" className = "buttonDiv" onClick={buttonHandler} style={{marginTop: '25px', background: '#A2A3A8', marginRight: '10px'}}>
                                    <div className='button-text'>Previous</div>
                                </button>
                                <button name="Next" className = "buttonDiv" onClick={buttonHandler} style={{marginTop: '25px', background: '#2D3A6F' }}>
                                    <div className='button-text'>Next</div>
                                </button>
                            </Row> 
                            <Row className = "mainContainerImgFrame3 flex-nowrap" style ={{marginTop:"5px"}}>
                                <Col lg={11} md={11} sm={11} xs={11}></Col>
                                <Col lg={1} md={1} sm={1} xs={1}>
                                    <img className = "okaneIcon" src="images/okane_logo.png"></img>
                                </Col>
                            </Row> 
                        </Container>     
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Frame3