import { getAuth, User, sendEmailVerification } from 'firebase/auth';
import React from 'react';
import { Card, Col, Container, Row, Navbar } from 'react-bootstrap';

interface PropsInterface  {
    
}

const auth = getAuth();

const UnverifiedEmail: React.FC<PropsInterface> = () => {
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        if (button.name === "resend") {
            sendEmailVerification(auth.currentUser as User).then(() => {
                // Email verification sent!
                console.log('email sent');
            }).catch (e => {
                console.error(e);
            })

        } else {
            window.location.reload()
        }
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2">
                        <img src="images/okane_logo_128.png" alt="BigCo Inc. logo" style={
                                {
                                    width: "55px", 
                                    height: "55px",
                                    borderRadius: "40px",
                                }
                            }>
                        </img>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid align-content= "center" px-4>
                <Row className="justify-content-md-center">
                    <Col md ="auto">
                    </Col>
                    <Col md ="6">
                        <Row style={{top:"200px"}}>
                            <div className='BoldHeader' >
                                Thank you for joining the Okane Family!
                            </div>
                        </Row>
                        <Row style={{top:"200px"}}>
                            <div className='SecondaryHeader' >
                                To ensure your security, please verify your email to continue onboarding with Okane!
                            </div>
                        </Row>
                        <Row>
                            <button onClick={buttonHandler} >
                                <div className='button-text'>Email Verified</div>
                            </button>
                            <button name="resend" onClick={buttonHandler} >
                                <div className='button-text'>Resend Verification Email</div>
                            </button>
                        </Row>
                    </Col>
                    <Col md ="auto">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UnverifiedEmail