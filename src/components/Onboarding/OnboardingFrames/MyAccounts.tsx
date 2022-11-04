import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BudgetNavBar from './BudgetNavBar';
import mixpanel from './../../../models/mixpanel'
import './MyAccounts.css';


interface PropsInterface  {
    hideComponent: (name:string) => void
}
interface MyState {
    userAccounts: AccountObject[],
    loadingState: boolean,
    progressNumber: number,
    percentageLoad: number,
}

interface AccountObject {
    name: string,
    type: string,
    subtype: string,
    balance: number,
}

export default class MyAccounts extends React.Component<PropsInterface, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userAccounts: [],
            loadingState: true,
            progressNumber: 0,
            percentageLoad: 0,
        }
        this.buttonHandler = this.buttonHandler.bind(this);
    }

    buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        if (button.name === "Next") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Finished Loading Account Screen")
            })
            if(!this.state.loadingState){
                this.props.hideComponent("showHideFrame6");
            } else {
                window.alert("Still Loading... Please wait!")
            }
            
        } else if (button.name === "Previous") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Back to Plaid Onboarding")
            })
            this.props.hideComponent("showHidePlaidOnboarding");
        }
    };

    logActualTime = () => {
        if (this.state.percentageLoad < 100) {
            let percentage = this.state.percentageLoad + 1;
            this.setState({
                percentageLoad: percentage
            });
        }
    }

    async componentDidMount() {
        setTimeout(() => {
            this.setState({
                loadingState: false,  
            })
        }, 125000)
        setInterval(this.logActualTime, 1250);
    }

    render() {
        return (
            <div>
                <BudgetNavBar></BudgetNavBar>
                <Container fluid align-content= "center">
                    <Row >
                        <Col md={3} sm={3} xs={3} style ={{top:"150px", minWidth: "250px"}}>
                        </Col>
                        <Col id = "contentContainer" md = {6} sm={6} xs={6} className="mainContainerMyAccounts" style ={{top:"150px", minWidth: "500px"}}> 
                            <Row >
                                <div className="circle" ></div>
                                <div className="circle" style = {{background: '#2D3A6F',left: "10px"}} ></div>
                                <div className="circle" style = {{left: "20px"}} ></div>
                            </Row>
                            <Row  style ={{marginTop:"5px"}}>
                                <div className='BoldHeader'>
                                    Analyzing your transaction data, it'll take approximately ~2 minutes...
                                </div>
                                <div className='SecondaryHeaderMyAccounts'>
                                    It'll be worth it <span>😀</span>! Please do not close this window during this step. Apologies for the inconvenience! While you wait, watch Okane's demo video <a href="https://youtu.be/8rkhz71n8Rc" target="_blank">here</a>
                                </div>
                                <Row className='BoldHeader justify-content-center mx-auto' style={{ marginTop: '5px'}}>
                                    {this.state.percentageLoad}%
                                </Row>
                                <div className="meter">
                                    <span style={{width: "100%"}} ><span className="progress"></span></span>
                                </div>
                            </Row>
                            <Row style = {{marginTop: "15px"}}>
                                <button className = "buttonDiv" name="Previous" onClick={this.buttonHandler} style={{background: '#A2A3A8'}}>
                                    <div className='button-text'>Add More Accounts</div>
                                </button>
                                {!this.state.loadingState ? 
                                    <button className="buttonDiv" name="Next" onClick={this.buttonHandler} style={{ left: '20px'}}>
                                        <div className='button-text'>Continue!</div>
                                    </button>
                                    :
                                    <button className="buttonDiv" disabled name="Next" onClick={this.buttonHandler} style={{ left: '20px'}}>
                                        <div className='button-text'>Loading!</div>
                                    </button>
                                }
                            </Row>
                        </Col>
                        <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}></Col>
                        <Col id = "imageContainer" md = {6} sm={6} xs={6} className="mainContainerImgMyAccounts" style ={{top:"125px", left: "25px", minWidth: "500px"}}>
                            <img className = "okaneIcon" src="images/okane_logo.png"></img>
                        </Col>
                        <Col md={3} sm={3} xs={3} style ={{top:"100px", minWidth: "250px"}}></Col>
                    </Row>
                </Container>
             </div>
        )
    }
}