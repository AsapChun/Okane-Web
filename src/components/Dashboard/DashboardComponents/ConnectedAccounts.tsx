import { Card, Row, Table, Spinner } from "react-bootstrap";

interface AccountObject {
  id: number,
  name: string,
  type: string,
  subtype: string,
  balance: number,
}

interface PropsInterface  {
  accountObjectList: AccountObject[],
  plaidLinked: string
}

const ConnectedAccounts: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  let accountObjectList = props.accountObjectList;
  let plaidLinked = props.plaidLinked;
  if(plaidLinked === "false") {
    accountObjectList = [
      {
        id: 1,
        name: "Bank Of America",
        type: "Checking",
        subtype: "Checking",
        balance: 1000
      }, 
      {
        id: 2,
        name: "Bank Of America",
        type: "Checking",
        subtype: "Savings",
        balance: 3000
      },
      {
        id: 3,
        name: "Chase",
        type: "Checking",
        subtype: "Savings",
        balance: 1000
      }
    ]
  } 
  return(
    <Card className = "border-0 p-0 m-0" style={{
      width:"100%",
    }}>
      <Card.Header className = "p-0 m-0">
        <Card.Title style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "15px"
          }}>Connected Accounts</Card.Title>
          {accountObjectList.length === 0 ? 
            <Row style={{
              paddingLeft: "15px"
            }}>
              <Spinner animation="grow" size="sm"/>
              <Spinner animation="grow" size="sm"/> 
              <Spinner animation="grow" size="sm"/> 
              Loading 
            </Row> :
            <div style={{
              fontFamily:"Poppins, sans-serif",
              fontSize: "16px",
            }}>{plaidLinked === "false" ? "Type of Account and Balance (Example Data)" : "Type of Account and Balance"}</div>
          }
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0 my-custom-scrollbar ">
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0 p-0 m-0">Balance</th>
                <th className="border-0 p-0 m-0">Account Name</th>
                <th className="border-0 p-0 m-0">Account Type</th>
              </tr>
            </thead>
            <tbody>
              {accountObjectList.map(account =>  
                <tr key={account.id}>
                  <td>${Math.round(account.balance)}</td>
                  <td>{account.name}</td>
                  <td>{account.subtype}</td>
                </tr>
              )}
            </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default ConnectedAccounts