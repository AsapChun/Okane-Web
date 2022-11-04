import { Component } from 'react';
import { Card } from 'react-bootstrap';


type MyProps = {
  
}

type MyState = {
  
}



class SupportFrame extends Component<MyProps, MyState> {
  // constructor(props: any) {
  //   super(props)
  // }
  render() {
    return (
      <div>
        <Card style={{height: "400px"}}>
          <Card.Header>Support</Card.Header>
          <Card.Body>
            <Card.Title>Need help or have questions? Email us using the address below:</Card.Title>
            <Card.Text style ={{marginTop: "20px", textAlign: "center"}}>
              <b>okane-team@okane-app.com</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default SupportFrame