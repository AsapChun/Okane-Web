import { Component } from 'react';
import { Col, Card, Container, Row, Button, ListGroup } from 'react-bootstrap';
import HomeFooter from './components/HomeFooter';
import HomeNavbar from './components/HomeNavbar';
import './AboutUs.css'

type MyProps = {
  
}

type MyState = {

}

class AboutUs extends Component<MyProps, MyState> {
  render() {
    return (
      <div>
        <HomeNavbar></HomeNavbar>
        <Container fluid>
          <Row className="justify-content-center mx-auto">
            <div className='homepage-title'>
              Building The Future of Budgeting 
            </div> <br/>
          </Row>
          <Row className="justify-content-center mx-auto">
            <div className='homepage-secondary-title'>
              We built Okane to empower our users to take control of their finances!
            </div> 
          </Row>
          <Row className="justify-content-center mx-auto">
            <div className='homepage-row-primary'>
              Meet The Team 
            </div> <br/>
          </Row>
          <Row className="justify-content-center mx-auto">
            <Col md="auto">
              <Card style={{ width: '25rem', borderRadius: "100px"}} className="text-center mx-auto">
                <Card.Img variant="top" src="images/Sean_Profile_Pic.jpeg" style={{width:"300px", height:"400px", borderRadius: "100px", marginTop: "10px", objectPosition: "70% 15%"}} className="mx-auto"/>
                <Card.Body>
                  <Card.Title>
                    Sean Chun
                  </Card.Title>
                  <Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Position: </b>CoFounder, Tech Lead</ListGroup.Item>
                      <ListGroup.Item><b>Motto: </b> Without rice, there is no life </ListGroup.Item>
                      <ListGroup.Item><b>Interests: </b> Actively breaking no carb diet</ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                  <Button variant="primary">Linkedln</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md="auto">
              <Card style={{ width: '25rem', borderRadius: "100px"}} className="text-center">
                <Card.Img variant="top" src="images/Alice_photo.jpg" style={{width:"300px", height:"400px", borderRadius: "100px", marginTop: "10px"}} className="mx-auto"/>
                <Card.Body>
                  <Card.Title>
                    Alice Shih
                  </Card.Title>
                  <Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Position: </b>CoFounder, Design Lead</ListGroup.Item>
                      <ListGroup.Item><b>Motto: </b> No pain, No gains </ListGroup.Item>
                      <ListGroup.Item><b>Interests: </b> Buying and selling protein </ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                  <Button variant="primary">Linkedln</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md="auto">
              <Card style={{ width: '25rem', borderRadius: "100px"}} className="text-center">
                <Card.Img variant="top" src="images/yak.jpg" style={{width:"300px", height:"400px", borderRadius: "100px", marginTop: "10px"}} className="mx-auto"/>
                <Card.Body>
                  <Card.Title>
                    Satish Gupta
                  </Card.Title>
                  <Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Position: </b>CoFounder, Business Lead</ListGroup.Item>
                      <ListGroup.Item><b>Motto: </b> Without curry, there is no life </ListGroup.Item>
                      <ListGroup.Item><b>Goals: </b> Bollywood Actor</ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                  <Button variant="primary">Linkedln</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center mx-auto">
            <div className='homepage-secondary-title'>
              <b>Contact us at okane-team@okane-app.com</b>
            </div>
          </Row>
          <br/>
          <br/>

          <Row className="justify-content-center mx-auto" style={{}}>
              <HomeFooter></HomeFooter>
          </Row>
        </Container>
      </div>
    )
  }
}
export default AboutUs