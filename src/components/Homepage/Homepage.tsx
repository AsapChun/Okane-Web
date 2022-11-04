import { Component } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Badge, Carousel, Card, Nav } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import HomeFooter from './components/HomeFooter';
import HomeNavbar from './components/HomeNavbar';
import Timer from './components/Timer';
import "./Homepage.css"

type MyProps = {
  
}

type MyState = {
    securityCardState: string

}
const style = {
    featurette: {
        divider: {
          margin: '5rem 0'
        },
        image: {
          width: '500px',
          height: '500px'
        }
      }
}
class Homepage extends Component<MyProps, MyState> {
     constructor(props: any) {
         super(props);
         this.state = {
             securityCardState: "plaid"
         }
     }
     render() {
        const directionButtons = (direction: {} | null | undefined) => {
            return (
              <span
                aria-hidden="false"
                className={direction === "Next" ? "button-next" : "button-prev"}
              >
                <Button variant="outline-secondary">
                    <div className='homepage-row-secondary'>
                        <b>{direction}</b>
                    </div>
                </Button>
              </span>
            );
        };
        return (
            <div>
                <HomeNavbar></HomeNavbar>
                <div>
                    <Container fluid className=" vh-100" style={{marginTop: '50px'}}>
                        <Row className="justify-content-center mx-auto">
                            <div className='homepage-title' >
                                Make Informed Purchases
                            </div> <br/>
                            
                            <div className='homepage-secondary-title'>
                                Okane is a free Chrome Extension that helps you to make financially informed purchase decisions while shopping online.
                            </div> <br/>
                        </Row>
                        <br/>
                        <Row className="justify-content-center mx-auto">
                            <Button variant="secondary" style={{width: "200px"}} onClick={(e)=> window.location.href = "https://t.maze.co/84916820"}>Try Our Product Demo</Button>
                            {/* &nbsp; &nbsp; &nbsp;
                            <Button variant="outline-secondary">Subscribe</Button> */}
                        </Row>
                        <br/>
                        <Row className="justify-content-center mx-auto">
                            <div style={{ display: 'block', width: 900, padding: 30 }}>
                                <Carousel variant="dark" 
                                    indicators={false} 
                                    fade nextIcon={directionButtons("Next")} 
                                    prevIcon={directionButtons("Previous")}
                                    interval={10000}
                                >
                                    <Carousel.Item>
                                        <img className="d-block w-90"
                                            src= 'images/onboarding.gif' alt='none' style= {
                                                {   
                                                    margin: '0 auto',
                                                    width:'555px', 
                                                    height:'560px', 
                                                    background: '1px solid #C4C4C4', 
                                                    boxSizing:'border-box',
                                                }
                                            }>
                                        </img>
                                        <Carousel.Caption style= {{right: '50px',bottom: '450px'}}className="homepage-carousel-badge">
                                            <Badge bg="dark">Make Informed Purchases!</Badge>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-90"
                                            src= 'images/okane-dashboard-preview.jpg' alt='none' style= {
                                                {   
                                                    width:'555px', 
                                                    height:'560px',
                                                    background: '1px solid #C4C4C4', 
                                                    boxSizing:'border-box',
                                                    margin: '0 auto',
                                                }
                                            }>
                                        </img>
                                        <Carousel.Caption style={{left: '350px'}}className="homepage-carousel-badge">
                                            <Badge bg="dark">View your finances!</Badge>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item className="justify-content-center" style={{alignItems: 'center'}}>
                                        <img className="d-block w-90"
                                            src= 'images/okane-toolbar.gif' alt='none' style= {
                                                {   
                                                    width:'555px', 
                                                    height:'560px', 
                                                    background: '1px solid #C4C4C4', 
                                                    boxSizing:'border-box',
                                                    display: 'inline-block',
                                                    margin: '0 auto',
                                                }
                                            }>
                                        </img>
                                        <Carousel.Caption className="homepage-carousel-badge">
                                            <Badge bg="dark">No need to check your phone!</Badge>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Row>
                        <hr style={style.featurette.divider} />
                        <Row className="justify-content-center mx-auto">
                            <h2 className='homepage-row-primary'>Quick Demo Video</h2>
                        </Row>
                        <Row className="justify-content-center mx-auto">
                            <ReactPlayer url="https://www.youtube.com/watch?v=Pz75Qp2s0LQ"/>
                        </Row>
                        <hr style={style.featurette.divider} />
                        <Row className="justify-content-center mx-auto">
                            <h2 className='homepage-row-primary'>Works on major retail/ecommerce sites:</h2>
                        </Row>
                        <br/>
                        <Row className="justify-content-center mx-auto" style={{width: '850px', marginLeft: '20px', marginRight: '20px'}}>
                            <img className="d-block"
                                src= 'images/amazon-icon.jpg' alt='none' style= {
                                    {   
                                        width:'90px', 
                                        height:'90px',
                                        background: '1px solid #C4C4C4', 
                                        boxSizing:'border-box',
                                        margin: '0 auto',
                                    }
                                }>
                            </img>
                            <img className="d-block"
                                src= 'images/ebay-icon.jpg' alt='none' style= {
                                    {   
                                        width:'90px', 
                                        height:'90px',
                                        background: '1px solid #C4C4C4', 
                                        boxSizing:'border-box',
                                        margin: '0 auto',
                                    }
                                }>
                            </img>
                            <img className="d-block"
                                src= 'images/walmart-icon.jpg' alt='none' style= {
                                    {   
                                        width:'90px', 
                                        height:'90px',
                                        background: '1px solid #C4C4C4', 
                                        boxSizing:'border-box',
                                        margin: '0 auto',
                                    }
                                }>
                            </img>
                            <img className="d-block"
                                src= 'images/Google-Flights-Icon.jpg' alt='none' style= {
                                    {   
                                        width:'90px', 
                                        height:'90px',
                                        background: '1px solid #C4C4C4', 
                                        boxSizing:'border-box',
                                        margin: '0 auto',
                                    }
                                }>
                            </img>
                            <img className="d-block"
                                src= 'images/target-icon.jpg' alt='none' style= {
                                    {   
                                        width:'90px', 
                                        height:'110px',
                                        background: '1px solid #C4C4C4', 
                                        boxSizing:'border-box',
                                        margin: '0 auto',
                                    }
                                }>
                            </img>
                            <img className="d-block"
                                src= 'images/nike-icon.jpg' alt='none' style= {
                                    {   
                                        width:'90px', 
                                        height:'90px',
                                        background: '1px solid #C4C4C4', 
                                        boxSizing:'border-box',
                                        margin: '0 auto',
                                    }
                                }>
                            </img>
                        </Row>
                        <hr style={style.featurette.divider} />
                        <br/>
                        <Row className="justify-content-center mx-auto">
                            <Col className="display: flex; align-items: center;">
                                <Row className="justify-content-center mx-auto align-items-end" style={{top: '105px'}}>
                                    <Card style={{ width: '35rem' }}>
                                        <Card.Body>
                                            {/* <Card.Title>
                                                <div className='homepage-row-secondary'>Shopping Without Guessing</div>
                                            </Card.Title> */}
                                            <Card.Subtitle className="mb-2 text-muted homepage-row-primary">Automatic Budgeting</Card.Subtitle>
                                            <Card.Text>
                                                <div className='homepage-row-secondary'>
                                                    Struggling to decide if something fits your budget?
                                                    We'll show you how a potential purchase impacts your financial situation.
                                                    Our mission is to empower users' to budget before making a purchase 
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col className="justify-content-center mx-auto">
                                <Row className="justify-content-center mx-auto">
                                    <img src= 'images/onboarding2.png' alt='none' style= {
                                        {   
                                            width:'495px', 
                                            height:'510px', 
                                            background: '5px solid #151617', 
                                            boxSizing:'border-box',
                                            border: '2px solid #555'
                                        }
                                    }>
                                    </img>
                                </Row>
                            </Col>
                        </Row>
                        <hr style={style.featurette.divider} />
                        <br/>
                        <Row className="justify-content-center mx-auto">
                            <Col className="justify-content-center mx-auto">
                                <Row className="justify-content-center mx-auto">
                                    <img src= 'images/budgeting-screens.gif' alt='none' style= {
                                        {   
                                            width:'495px', 
                                            height:'510px', 
                                            background: '5px solid #151617', 
                                            boxSizing:'border-box',
                                            border: '2px solid #555'
                                        }
                                    }>
                                    </img>
                                </Row>
                            </Col>
                            <Col className="display: flex; align-items: center;">
                                <Row className="justify-content-center mx-auto align-items-end" style={{top: '0px'}}>
                                    <Card style={{ width: '35rem' }}>
                                        <Card.Body>
                                            {/* <Card.Title>
                                                <div className='homepage-row-secondary'>Budgeting that makes sense</div>
                                            </Card.Title> */}
                                            <Card.Subtitle className="mb-2 text-muted homepage-row-primary">A Simple Budget Setup</Card.Subtitle>
                                            <Card.Text>
                                                <div className='homepage-row-secondary'>
                                                    A budgeting process built by users for users. We understand that budgeting is tough,
                                                    and at Okane, we try to make this as seamless as possible. 
                                                    Our goal is to empower every user to reach their savings goals 
                                                <br/>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                        </Row>
                        <hr style={style.featurette.divider} />
                        <br/>
                        <Row className="justify-content-center mx-auto">
                            <Col className="display: flex; align-items: center;">
                                <Card style={{ width: '35rem'}}>
                                    <Card.Body>
                                        {/* <Card.Title>
                                            <div className='homepage-row-secondary'>Commited to your security</div>
                                        </Card.Title> */}
                                        <Card.Subtitle className="mb-2 text-muted homepage-row-primary">Industry Leading Security</Card.Subtitle>
                                        <Card.Text>
                                            <div className='homepage-row-secondary'>
                                                We know how imporant your data is to you. Okane uses the best encryption in the industry
                                                to keep your data. You're in control of your data and you can delete your account at any 
                                                time.
                                            <br/>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                 </Card>
                            </Col>
                            <Col className="justify-content-center mx-auto">
                            <Card>
                            <Card.Header>
                                <Nav variant="tabs" >
                                <Nav.Item >
                                    <Nav.Link onClick={(e) => this.setState({securityCardState: "plaid"})}>Powered by Plaid</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={(e) => this.setState({securityCardState: "GCP"})}>Stored on GCP</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={(e) => this.setState({securityCardState: "256"})}>256 Bit Encryption</Nav.Link>
                                </Nav.Item>
                                </Nav>
                            </Card.Header>
                            {this.state.securityCardState === "plaid" ? 
                                <Card.Body>
                                    <Card.Title>
                                        <Row className="justify-content-center mx-auto">
                                            <img src= 'images/plaid-icon.jpg' alt='none' style= {
                                                {   
                                                    width:'150px', 
                                                    height:'100px', 
                                                    background: '5px solid #151617', 
                                                    boxSizing:'border-box',
                                                }
                                            }>
                                            </img>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text className='homepage-row-secondary'>
                                    We use Plaid to securely connect to more than <b>15,000 financial institutions</b> across the U.S. 
                                    <br></br>
                                    <br></br>
                                    During the registration process, you will be asked to enter your online banking credentials. 
                                    &nbsp; <b>These credentials never touch our servers, nor are they stored by us in any way. </b>
                                    <br></br>
                                    Your credentials are sent through Plaid to your bank or credit card provider. 
                                    Plaid then sends back an encrypted token to us which provides access to your transaction data. 
                                    <br></br>
                                    <br></br>
                                    <b>We cannot make any changes to your account.</b> &nbsp;
                                    You can revoke our access token by unlinking your account at any time.
                                    </Card.Text>
                                    <Button variant="primary" onClick={(e) => window.location.href ="https://plaid.com/"}>Learn More</Button>
                                </Card.Body> :
                                <></>
                            }
                            {this.state.securityCardState === "GCP" ? 
                                <Card.Body>
                                    <Card.Title>
                                        <Row className="justify-content-center mx-auto">
                                            <img src= 'images/gcp-icon.png' alt='none' style= {
                                                {   
                                                    width:'150px', 
                                                    height:'100px', 
                                                    background: '5px solid #151617', 
                                                    boxSizing:'border-box',
                                                }
                                            }>
                                            </img>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text className='homepage-row-secondary'>
                                        We host our servers securely using Google Cloud Provider (GCP), a secure online 
                                        data storage and hosting service. Your financial data on our 
                                        servers will never be accessed or used by any other party
                                    </Card.Text>
                                    <img src= 'images/gcp-providers.png' alt='none' style= {
                                            {   
                                                width:'400px', 
                                                height:'300px', 
                                                background: '5px solid #151617', 
                                                boxSizing:'border-box',
                                                border: '2px solid #555'
                                            }
                                        }>
                                    </img>
                                    <Button style= {{left: "50px"}} variant="primary" onClick={(e) => window.location.href ="https://cloud.google.com/"}>Learn More</Button>
                                </Card.Body> :
                                <></>
                            }
                            {this.state.securityCardState === "256" ? 
                                <Card.Body>
                                    <Row className="justify-content-center mx-auto">
                                        <Card.Title>
                                            <b>AES 256 Bit Level Encryption</b>
                                        </Card.Title>
                                    </Row>
                                    <Card.Text className='homepage-row-secondary'>
                                        We're invested heavily in making sure our platform uses the most
                                        up-to-date industry protocols for storing your data including bank-level 256 bit encryption.
                                    </Card.Text>
                                    <Row className="justify-content-center mx-auto">
                                        <div className='homepage-row-secondary'>
                                            <b>Companies using 256-level bit encryption:</b>
                                        </div>
                                    </Row>
                                    <Row className="justify-content-center mx-auto">
                                        <img src= 'images/truebill-icon.jpg' alt='none' style= {
                                            {   
                                                width:'100px', 
                                                height:'100px', 
                                                background: '5px solid #151617', 
                                                boxSizing:'border-box',
                                            }}>
                                        </img>
                                        <img src= 'images/google-icon.png' alt='none' style= {
                                            {   
                                                width:'120px', 
                                                height:'100px', 
                                                background: '5px solid #151617', 
                                                boxSizing:'border-box',
                                            }}>
                                        </img>
                                        <img src= 'images/bofa-icon.png' alt='none' style= {
                                            {   
                                                width:'100px', 
                                                height:'100px', 
                                                background: '5px solid #151617', 
                                                boxSizing:'border-box',
                                            }}>
                                        </img>
                                    </Row>
                                    <Row className="justify-content-center mx-auto">
                                        Have Questions? Email us at okane-team@okane-app.com
                                    </Row>
                                </Card.Body> :
                                <></>
                            }
                            </Card>
                            </Col>
                        </Row>
                        <hr style={style.featurette.divider} />
                        <br/>
                        <Row className="justify-content-center mx-auto">
                            <Col md="auto" className="justify-content-center mx-auto">
                                <Timer></Timer>
                            </Col>
                            <Col md="5" className="display: flex; align-items: center;">
                                <Row className="justify-content-center mx-auto">
                                    <div className='homepage-row-primary'>
                                        We will be available in the Chrome Store soon -- let’s stay in touch!
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row className="justify-content-center mx-auto" style={{}}>
                            <HomeFooter></HomeFooter>
                        </Row>

                    </Container>
                </div>
            </div>
        )
  }

}
export default Homepage