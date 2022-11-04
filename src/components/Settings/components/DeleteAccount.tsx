import { deleteUser, getAuth, GoogleAuthProvider, reauthenticateWithCredential, signInWithPopup } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Component } from 'react';
import { Button, Card , Form, OverlayTrigger, Popover, Row} from 'react-bootstrap';
import mixpanel from './../../../models/mixpanel'

type MyProps = {
  
}

type MyState = {
  deleteAccountState: boolean,
  deletionInProgress: boolean,
}


const googleAuth = getAuth();
const functions = getFunctions();

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Deleting your account</Popover.Header>
    <Popover.Body>
      We are deleting your account. Please resign in and wait shortly...
    </Popover.Body>
  </Popover>
);

class DeleteAccount extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      deleteAccountState: false,
      deletionInProgress: false,
    }
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  removePlaidItem = httpsCallable(functions, 'removePlaidItem');

  async deleteAccount() {
    if (this.state.deleteAccountState) { 
      const user = googleAuth.currentUser;
      if (user) {
        let provider = new GoogleAuthProvider();
        signInWithPopup(googleAuth, provider).then((result) => {
          console.log("sign in succcess")
          const credential = GoogleAuthProvider.credentialFromResult(result);
          reauthenticateWithCredential(user, credential!).then(() => {
            // User re-authenticated.
            this.removePlaidItem().then((result) => {
              deleteUser(user).then(() => {
                console.log("User Deleted");
                // User deleted.
                mixpanel.setIdentity().then(()=>{
                  mixpanel.trackEvent("User Deleted")
                });
                localStorage.clear()
                window.location.href = "/Login"
              }).catch((error) => {
                // An error ocurred
                // ...
                console.error(error);
              });
            }).catch((error) => {
              console.log(error)
            })
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }

  render() {
    return (
      <div>
        <Card style={{height: "400px"}}>
          <Card.Header>Delete Account</Card.Header>
          <Card.Body>
            <Card.Title>Deleting your account will remove all information and cannot be undone</Card.Title>
            <Row className="justify-content-center mx-auto">
              <Form>
                <Form.Check type={"checkbox"}>
                  <Form.Check 
                    type="checkbox"
                    id="custom-switch"
                    label="I confirm that deletion of my account is irreversible."
                    defaultChecked={false}
                    onClick={(e) => {
                      this.setState({
                        deleteAccountState: !this.state.deleteAccountState
                      })
                    }}
                  />
                </Form.Check>
              </Form>
            </Row>
            {this.state.deleteAccountState ? 
            <Row className="justify-content-center mx-auto">
              <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button style={{height:'50px', width: '150px'}} variant="primary" type="submit" onClick={() => this.deleteAccount()}>
                  Delete Account
                </Button>
              </OverlayTrigger>
            </Row>
            :
            <Row className="justify-content-center mx-auto">
              <Button style={{height:'50px', width: '150px'}} variant="primary" type="submit" onClick={() => this.deleteAccount()}>
                Delete Account
              </Button>
            </Row>
          }
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default DeleteAccount
