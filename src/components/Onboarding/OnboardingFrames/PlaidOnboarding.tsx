import React from 'react';
import Plaid from '../../Plaid/Plaid';
import { Alert, Popover, Col, Container, Row, OverlayTrigger, Spinner } from 'react-bootstrap';
import BudgetNavBar from './BudgetNavBar';
import mixpanel from './../../../models/mixpanel'
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useEffect, useState } from 'react';
import './PlaidOnboarding.css';


interface PropsInterface  {
    hideComponent: (name:string) => void
}

const functions = getFunctions();
const getValidatePlaidLinked = httpsCallable(functions, 'validatePlaidLinked');

const PlaidOnboarding: React.FC<PropsInterface> = (
    props: PropsInterface
) => {
    const [plaidLinked, setPlaidLinked] = useState(false);
    const [plaidLinkingProgress, setPlaidLinkingProgress] = useState(false);
    const { hideComponent } = props;
    // let from_dashboard = localStorage.getItem("from_dashboard");

    const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        if (button.name === "Next") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Go to my Accounts (finished connecting plaid)")
            })
            getValidatePlaidLinked().then((result : any) => {
                let isLinked : boolean = result.data.plaidLinked 
                setPlaidLinked(isLinked)
                if(isLinked) {
                    setTimeout(function () {
                        hideComponent("showHideMyAccounts");
                    }, 8000)
                } else {
                    window.alert("Cannot Proceed, No Accounts Connected")
                    document.body.click()
                }
            });
        } else if (button.name === "Previous") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Go back to Frame 3")
            })
            hideComponent("showHideFrame3");
        }
    };

    useEffect(() => {
        getValidatePlaidLinked().then((result) => {
          let data : any = result.data;
          setPlaidLinked(data.plaidLinked);
        })
      }, [])
    


    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Gathering Account Information</Popover.Header>
          <Popover.Body>
            Please wait shortly...
            <Spinner animation="grow" size="sm" variant="primary"/>
            <Spinner animation="grow" size="sm" variant="primary"/>
            <Spinner animation="grow" size="sm" variant="primary"/>
          </Popover.Body>
        </Popover>
    );
    return(
        <div>
            <BudgetNavBar></BudgetNavBar>
            <Container fluid align-content= "center">
                <Row className="justify-content-md-center flex-nowrap">
                    <Col md ="auto" justify-content-center style ={{top:"50px"}}>
                        <video src= 'images/plaidVideoNoOkane.mp4' controls = {false} loop = {true} muted = {true} autoPlay= {true} style= {
                            {   
                                width:'600px', 
                                height:'400px', 
                                boxSizing:'border-box'
                            }
                        }>
                        </video>
                    </Col >
                    <Col md ="auto">

                    </Col>
                    <Col className = "mainContainerFrame3" md ="4" style ={{top:"50px", minWidth: "600px", height: "435px"}}> 
                        <Container fluid="md">
                            <Row >
                                <div className="circle" style = {{background: '#2D3A6F'}}></div>
                                <div className="circle" style = {{left: "10px"}} ></div>
                                <div className="circle" style = {{ left: "20px"}} ></div>
                            </Row>
                            <Row style ={{marginTop:"5px"}}>
                                <div className='BoldHeader'>
                                    Lets use Plaid to tailor Okane to your financials
                                </div>
                                <div className='SecondaryHeaderPlaidOnboarding'>
                                    Okane needs your permission to read your transaction data via Plaid<br></br>
                                    <b>Plaid is the same technology that securely powers Venmo ({'>'}50M users). At no point will Okane have access to your bank login or information.<br></br><br></br>
                                    </b>Learn more about Okane’s privacy policies <a target="_blank" rel="noopener noreferrer" href="https://okane.crd.co/#privacy">here</a>, and how Plaid works below 
                                </div>
                                <iframe width="350" height="200" src="https://www.youtube.com/embed/UgIqHCQ3pDE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    borderRadius: "5px",
                                    boxShadow: "rgb(0 0 0 / 30%) -5px 4px 10px"
                                }}></iframe>
                            {/* {from_dashboard === "true" ?
                            <></> :
                            <button name="Previous" onClick={buttonHandler} style={{ background: '#A2A3A8'}}>
                                <div className='button-text'>Previous</div>
                            </button>
                            }    */}
                        </Row>
                        <Row className = "mainContainerImgFrame3 flex-nowrap" style ={{}}>
                                <Col lg={11} md={11} sm={11} xs={11}></Col>
                                <Col lg={1} md={1} sm={1} xs={1}>
                                    <img className = "okaneIcon" src="images/okane_logo.png"></img>
                                </Col>
                            </Row> 
                        <Row style={{paddingTop: "10px"}}>
                          {plaidLinkingProgress ?
                            <></>
                          :
                            <>
                                <Plaid plaidLinked={plaidLinked} setPlaidLinked={setPlaidLinked} setPlaidLinkingProgress={setPlaidLinkingProgress}></Plaid>
                                    {
                                        plaidLinked && !(plaidLinkingProgress) ? 
                                            <OverlayTrigger rootClose={true} trigger="click" placement="right" overlay={popover}>
                                                <button name="Next" className="buttonDiv" onClick={buttonHandler} style={{marginLeft: "10px"}}>
                                                    <div className='button-text'>Done Connecting</div>
                                                </button>
                                            </OverlayTrigger>
                                            :
                                            <></>
                                    }
                            </> 
                            }
                        </Row>
                        <Row>
                            {
                                plaidLinkingProgress ? 
                                <div style={{marginTop: "15px"}}>
                                    <b>Linking Account With Plaid In Progress...</b> <Spinner animation="border" variant="primary" />
                                </div>
                                :
                                <></>
                            }
                            
                        </Row>
                        <Row>
                            <div style={{marginTop: "10px"}}>
                                    {
                                        plaidLinked ? 
                                            <Alert key={'success'} variant={'success'}>
                                                Success! At least one account has been connected. (For accurate results, please connect as many financial institutions as possible. If you have more to add, select 'Add Account' above)
                                            </Alert>
                                            : 
                                            <Alert key={'warning'} variant={'warning'}>
                                                No accounts have been connected! Click the button above to add an account
                                            </Alert>
                                    }
                            </div>
                        </Row>
                        </Container>      
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PlaidOnboarding