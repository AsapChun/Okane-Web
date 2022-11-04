import React from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import mixpanel from './../../../models/mixpanel';
import BudgetNavBar from './BudgetNavBar';

interface PropsInterface  {
  hideComponent: (name:string) => void
}

const EndOfFirstOnboarding: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  const { hideComponent } = props;
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      localStorage.setItem( 'authenticated', "true" );
      mixpanel.setIdentity().then(()=>{
          mixpanel.trackEvent("Done with first part of onboarding")
      })
      const button: HTMLButtonElement = event.currentTarget;
      if (button.name === "Demo") {
        mixpanel.setIdentity().then(()=>{
            mixpanel.trackEvent("Try out demo!")
        })
        window.open("https://www.amazon.com/PEACHCAT-Banana-Plushie-Hugging-Stuffed/dp/B09YH465QP/ref=sxin_15_ac_d_hl?ac_md=1-0-T3ZlcmFsbCBDaG9pY2U%3D-ac_d_hl_hl_ac&content-id=amzn1.sym.3663916c-38f6-4d73-9801-2e9551111db6%3Aamzn1.sym.3663916c-38f6-4d73-9801-2e9551111db6&crid=2AHHAQ4SG4DES&cv_ct_cx=plushies&keywords=plushies&pd_rd_i=B09YH465QP&pd_rd_r=211608fe-aacb-471d-be51-d53e353366f6&pd_rd_w=GCGte&pd_rd_wg=MI4xY&pf_rd_p=3663916c-38f6-4d73-9801-2e9551111db6&pf_rd_r=QJEM2XD0TJFDAMAZ273S&qid=1664234448&sprefix=plushie%2Caps%2C136&sr=1-1-25fd44b4-555a-4528-b40c-891e95133f20&th=1", '_blank', 'location=yes,height=750px,width=1250px,scrollbars=yes,status=yes');
        hideComponent("showPostFirstOnboarding");
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
          <Container align-content= "center">
                <Row>
                    <Col md={3} sm={3} xs={3} style ={{top:"150px", minWidth: "250px"}}>
                    </Col>
                    <Col id = "contentContainer" md = {6} sm={6} xs={6} className="mainContainer" style ={{top:"150px", minWidth: "500px"}}> 
                        <Row >
                            <div className="circle"></div>
                            <div className="circle" style={{left: "10px"}}></div>
                            <div className="circle" style={{left: "20px"}}></div>
                            <div className="circle" style={{left: "30px", background: '#2D3A6F'}}></div>
                            <div className="circle" style={{left: "40px"}}></div>
                        </Row>
                        <Row  style ={{marginTop:"5px"}}>
                            <div className='BoldHeader'>
                                Lets try out Okane!
                            </div>
                            <div className='SecondaryHeader'>
                                Select <b>'Try Demo'</b> to check out how we work while you're browsing. Please <b>close the popup when you are finished to proceed</b> to the final setup step
                                <br/><br/><b>Note: This is mock data</b>
                            </div>
                            {/* <button className="buttonDiv" onClick={buttonHandler} style={{marginTop:"25px"}} name="Accounts">
                                <div className='button-text'>Connect Accounts</div>
                            </button> */}
                            <button className="buttonDiv" onClick={buttonHandler} style={{marginTop:"25px"}} name="Demo">
                                <div className='button-text'>Try Demo</div>
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

export default EndOfFirstOnboarding