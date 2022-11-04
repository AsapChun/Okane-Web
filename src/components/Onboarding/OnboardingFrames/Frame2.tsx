import React, {useState} from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import mixpanel from './../../../models/mixpanel'
import './Frame2.css';


interface PropsInterface  {
    hideComponent: (name:string) => void
}

const Frame2: React.FC<PropsInterface> = (
    props: PropsInterface
) => {

    const[frame2Value, setFrame2Visibility] = useState("mainContainerFrame2");
    const[frame3Value, setFrame3Visibility] = useState("mainContainerFrame3Hidden");

    const[value, setValue] = useState("okaneUIInject");
    const[shake, setShake] = useState("okaneIconShake");

    function update(){
        setValue("okaneUIInjectActive");
        setShake("okaneIconNoShake");
        setFrame2Visibility("mainContainerFrame2FadeOut");
        setFrame3Visibility("mainContainerFrame3");
    }

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
                mixpanel.trackEvent("Go To Onboarding Frame 1")
            })
            hideComponent("showHideFrame1");
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
                        <img src= 'images/Frame_2_Image.png' alt='none' style= {
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
                    <Col className = {frame2Value} md ="4" style ={{top:"50px", minWidth: "400px", height: "200px"}}> 
                        <Container fluid="md">
                            <Row >
                                <div className="circle" ></div>
                                <div className="circle" style = {{background: '#2D3A6F',left: "10px"}} ></div>
                                <div className="circle" style = {{left: "20px"}} ></div>
                                <div className="circle" style = {{left: "30px"}} ></div>
                                <div className="circle" style = {{left: "40px"}} ></div>
                            </Row>
                            <Row style ={{marginTop:"5px"}}>
                                <div className='BoldHeader'>
                                    Lets try using Okane!
                                </div>
                                <div className='SecondaryHeader'>
                                    Try it out by <b>clicking on the Okane extension</b> on the 'window' to the <b>left</b>
                                </div>
                                <button name="Previous" className = "buttonDiv" onClick={buttonHandler} style={{marginTop: '25px', background: '#A2A3A8', outline: "none", border: "none"}}>
                                    <div className='button-text'>Previous</div>
                                </button>
                            </Row> 
                            <Row className = "mainContainerImgFrame2 flex-nowrap" style ={{marginTop:"5px"}}>
                                <Col lg={11} md={11} sm={11} xs={11}></Col>
                                <Col lg={1} md={1} sm={1} xs={1}>
                                    <img className = "okaneIcon" src="images/okane_logo.png"></img>
                                </Col>
                            </Row> 
                        </Container>     
                    </Col>
                    <Col className = {frame3Value} md ="4" style ={{top:"50px", minWidth: "400px", height: "275px"}}> 
                        <Container fluid="md">
                            <Row >
                                <div className="circle" ></div>
                                <div className="circle" style = {{left: "10px"}} ></div>
                                <div className="circle" style = {{background: '#2D3A6F', left: "20px"}} ></div>
                                <div className="circle" style = {{left: "30px"}} ></div>
                                <div className="circle" style = {{left: "40px"}} ></div>
                            </Row>
                            <Row style ={{marginTop:"15px"}}>
                                <div className='BoldHeader'>
                                    When you click on me...
                                </div>
                                <div className='SecondaryHeader'>
                                    I'll show you how a <b>potential purchase affects your budget!</b> We'll tailor Okane to your financials shortly...
                                </div>
                                <button name="Previous" className = "buttonDiv" onClick={buttonHandler} style={{marginTop: '35px', background: '#A2A3A8', marginRight: '10px', outline: "none", border: "none"}}>
                                    <div className='button-text'>Previous</div>
                                </button>
                                <button name="Next" className = "buttonDiv" onClick={buttonHandler} style={{marginTop: '35px', background: '#2D3A6F' }}>
                                    <div className='button-text'>Next</div>
                                </button>
                            </Row> 
                            <Row className = "mainContainerImgFrame3 flex-nowrap" style ={{marginTop:"25px"}}>
                                <Col lg={11} md={11} sm={11} xs={11}></Col>
                                <Col lg={1} md={1} sm={1} xs={1}>
                                    <img className = "okaneIcon" src="images/okane_logo.png"></img>
                                </Col>
                            </Row> 
                        </Container>     
                    </Col>
                </Row>
            </Container>
            <Container fluid align-content= "center">
                <Row className="justify-content-md-center flex-nowrap">
                    <Col md ="auto" justify-content-center style ={{bottom:"10px", textAlign: "right",  minWidth: "540px",}}>
                        <div>
                            <button name="Next" className = "buttonDiv" 
                            onClick={update} 
                            style={{backgroundColor: "transparent", borderStyle: "none"}}>
                                <img className = {shake} src="images/okane_logo.png"></img>
                            </button>
                            <div className="okaneUIInjectDiv">
                                <img className={value} src="images/extension_UIInject2.png"></img>
                            </div>
                        </div>
                    </Col >
                    <Col md ="auto">
                    </Col>
                    <Col md ="4" style ={{top:"50px", minWidth: "400px", height: "200px"}}> 
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Frame2