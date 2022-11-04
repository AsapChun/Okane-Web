import { Button, Col, Container , Row, Tab, ListGroup} from 'react-bootstrap';
import Navbars from '../Dashboard/Navbars';
import AccountInfo from './components/AccountInfo';
import DeleteAccount from './components/DeleteAccount';
import NotificationPreferences from './components/NotificationPreferences';
import SupportFrame from './components/SupportFrame';
import { useHistory } from 'react-router-dom';
import mixpanel from './../../models/mixpanel'

type MyProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings : React.FC<MyProps> = ({setIsAuth}) => {
  const history = useHistory();
  
  function backToDashboard(){
    mixpanel.setIdentity().then(()=>{
      mixpanel.trackEvent("back to dashboard")
    });
    history.push("/dashboard")
  }
  
  return(
    <div>
      <Navbars plaidLinked={"true"} setIsAuth={setIsAuth}/>
      <div>
        <Row className="justify-content-center mx-auto">
        <Container fluid style={{
          position: 'absolute',
          width: '1000px',
          height: '500px',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          background: '#FFFFFF',
          border: '1px solid #535353',
          boxSizing: 'border-box',
          boxShadow: '-5px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '5px',
          marginTop: '15px',
        }}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row style={{marginTop:'50px'}}>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Account Information
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Notification Preferences
                </ListGroup.Item>
                <ListGroup.Item action href="#link4">
                  Support
                </ListGroup.Item>
                <ListGroup.Item action href="#link6">
                  Delete Account
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <AccountInfo></AccountInfo>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <NotificationPreferences></NotificationPreferences>
                </Tab.Pane>
                <Tab.Pane eventKey="#link4">
                  <SupportFrame></SupportFrame>
                </Tab.Pane>
                <Tab.Pane eventKey="#link6">
                  <DeleteAccount></DeleteAccount>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
          <Button variant="outline-primary"
          onClick={() => backToDashboard()}
          style={{position: 'absolute', width: '200px', bottom: '40px'}}
          >
            Return To Dashboard
          </Button> 
        </Tab.Container>
          
        </Container>
        </Row>
      </div>
    </div>
  )
}
export default Settings
