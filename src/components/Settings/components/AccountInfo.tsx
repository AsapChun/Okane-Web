import { getAuth } from 'firebase/auth';
import { Component } from 'react';
import { Form, Card } from 'react-bootstrap';


type MyProps = {
  
}

type MyState = {
  
}

const auth = getAuth();

class AccountInfo extends Component<MyProps, MyState> {
  // constructor(props: any) {
  //   super(props)
  // }
  render() {
    return (
      <div>
        <Card style={{height: "400px"}}>
          <Card.Header>Account Info</Card.Header>
          <Card.Body>
            <Card.Title>Your Account Information can be changed through your Google Account settings</Card.Title>
            {/* <Card.Text>
              Account Email: 
            </Card.Text> */}
            <>
              <Form.Group className="mb-3">
                <Form.Label>Account Name</Form.Label>
                <Form.Control placeholder={auth.currentUser?.displayName ? auth.currentUser.displayName : ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Account Email</Form.Label>
                <Form.Control placeholder={auth.currentUser?.email ? auth.currentUser.email : ""} disabled />
              </Form.Group>
            </>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default AccountInfo