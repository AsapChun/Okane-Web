import { Component } from 'react';
import { Form, Card, Button, Row } from 'react-bootstrap';


type MyProps = {
  
}

type MyState = {
  optOutState: boolean
  
}

class NotifactionPreferences extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      optOutState: false
    }
    this.optOutComms = this.optOutComms.bind(this);
  }

  async optOutComms() {
    if (this.state.optOutState) { 
     
    }
  }

  render() {
    return (
      <div>
        <Card style={{height: "400px"}}>
          <Card.Header>Notifaction Preferences</Card.Header>
          <Card.Body>
            <Card.Title>If you do not wish to recieve updates from the Okane team, please opt-out below!</Card.Title>
            <div style={{marginTop: '20px'}}>
            <Row className="justify-content-center mx-auto">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check 
                  type="checkbox" 
                  label="Opt-Out All Communications"
                  defaultChecked = {false}
                  onClick={(e) => {
                    this.setState({
                      optOutState: !this.state.optOutState
                    })
                  }}
                   />
              </Form.Group>
            </Row>
            <Row className="justify-content-center mx-auto">
              <Button variant="primary" type="submit" onClick={() => this.optOutComms()}>
                Opt-Out
              </Button>
            </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default NotifactionPreferences