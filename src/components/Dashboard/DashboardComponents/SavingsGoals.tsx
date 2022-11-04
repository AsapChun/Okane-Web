import { Card, Table } from "react-bootstrap";
import styled from "styled-components";

export default function SavingsGoals() {
  return (
    <Card className="card-tasks savingsgoals" style={{
      width:"100%",
      margin: "0px !important",
      border: "none !important",
      backgroundColor: "lightgrey"
    }}>
      <Card.Header style={{
         backgroundColor: "lightgrey"
      }}>
        <Card.Title style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "20px",
          }}>Saving Goals</Card.Title>
      </Card.Header>
      <Card.Body className= "table-responsive my-custom-scrollbar" style={{
          paddingLeft: "15px !important",
          paddingRight: "15px !important"
      }}> 
        <Table className="table-hover">
          <tbody>
            <tr>
              <td>
                <Div15>🎁 </Div15>
              </td>
              <td>
                <SaveuptotraveltoJap>
                  Save up $500 for anniversary by Dec 2023
                </SaveuptotraveltoJap>
                <Div11>0 out of 500 saved</Div11>
              </td>
            </tr>
            <tr>
              <td>
                <Div15>🚗 </Div15>
              </td>
              <td>
                <SaveuptotraveltoJap>
                  Save up $5000 to buy a new car by Dec 2023
                </SaveuptotraveltoJap>
                <Div11>0 out of 5,000 saved</Div11>
              </td>
            </tr>
            <tr>
              <td>
                <Div15>⌚ </Div15>
              </td>
              <td>
                <SaveuptotraveltoJap>
                  Save up $300 to buy a apple watch by Dec 2022
                </SaveuptotraveltoJap>
                <Div11>0 out of 300 saved</Div11>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

const SaveuptotraveltoJap = styled.div`
  max-width: 471px;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  font-family: Poppins, sans-serif;
`;

const Div11 = styled.div`
  max-width: 121px;
  margin-top: 10px;
  color: rgba(50, 101, 203, 1);
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  font-family: Poppins, sans-serif;
`;

const Div15 = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 50px;
  justify-content: center;
  border-radius: 64px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding-top: 5px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-color: rgba(0, 0, 0, 1);
  border-width: 1px;
  border-style: solid;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(255, 253, 253, 1);
  font-size: 30px;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  font-family: Poppins, sans-serif;
`;