import { Row, Card , Stack} from "react-bootstrap"
import { Component } from 'react';

type MyProps = {

}
type MyState = {
  goalDate: Date,
  currentDate: {
    days: number,
    hours: number,
    mins: number,
    secs: number
  },
}

class Timer extends Component<MyProps, MyState>  {
  timerID: any;
  constructor(props: any){
    super(props);
    this.state = {
      goalDate: new Date("6/1/2022"),
      currentDate: {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0
      },
    }
    this.tick = this.tick.bind(this);
    this.convertMS = this.convertMS.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    const today = new Date();
    let differenceInDate = this.state.goalDate.getTime() - today.getTime();
    let timeObject = this.convertMS(differenceInDate);
    this.setState({
      currentDate: {
        days: timeObject.day,
        hours: timeObject.hour,
        mins: timeObject.minute,
        secs: timeObject.minute
      }
    });
  }
  convertMS( milliseconds : number ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
  }
  render() {
    return (
      <div>
      <Row className="justify-content-center mx-auto">
        <div className='homepage-row-primary'>
           <br/>
        </div>
      </Row>
      <Row className="justify-content-center mx-auto" md="auto">
          <Card style={{ width: '7rem', height: '6rem' }} className="text-center">
            <Card.Body className="text-center mx-auto">
              <div className='homepage-row-primary'>
              {this.state.currentDate.days} 
              </div>
            </Card.Body >
            <Card.Footer>
              <div className='homepage-row-secondary text-center'>
                Days
              </div>
            </Card.Footer>
          </Card>
          <Card style={{ width: '7rem', height: '6rem' }} className="text-center">
            <Card.Body className="text-center mx-auto">
              <div className="homepage-row-primary">
                {this.state.currentDate.hours} 
              </div>
            </Card.Body>
            <Card.Footer>
              <div className='homepage-row-secondary'>
                Hours
              </div>
            </Card.Footer>
          </Card>
          <div className='homepage-row-primary'>
           &nbsp;&nbsp; till Launch! 
          </div>
      </Row>

    </div>
    )
  }
}
export default Timer