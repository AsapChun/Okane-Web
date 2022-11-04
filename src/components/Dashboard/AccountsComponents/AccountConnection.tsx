import {Table} from "react-bootstrap"
import UpdatePlaid from "../../Plaid/UpdatePlaid";
import { InstituitonObject } from "../DashboardRedesign";

interface PropsInterface {
    userAccounts: InstituitonObject[],
    accountType: string,
    plaidLinked: string;
    accountDataLoaded: boolean;
}

const AccountConnection: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  
    let displayAccounts = props.userAccounts;
    let plaidLinked = props.plaidLinked;
    if(plaidLinked === "false" && !props.accountDataLoaded){
      displayAccounts = [
        {
          institutionId: "1",
          institutionName: "Plaid (Demo Data)",
          auth: true,
          plaidItemId: "1",
        }
      ];
    }
  return(
    <div className = "flex-nowrap">
      <div style = {{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
      }}>
        {props.accountType}
      </div>
      <Table className="table-hover" style={{width: "100%"}}>
        <thead>
          <tr>
            <th scope="col">Instituition</th>
            <th scope="col">Connection Status</th>
          </tr>
        </thead>
        <tbody>
          {displayAccounts.map((data) => 
            <tr key={data.institutionId} style ={{
                fontFamily: 'Poppins',
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "15px",
            }}>
              <td className="text-nowrap" style ={{}}>
                <div>{data.institutionName}</div>
              </td>
              <td className="text-nowrap" style ={{}}>
                <div>{!data.auth ? "Disconnected, please reconnect..." : "Connected"}</div>
              </td>
              <td className="text-nowrap" style ={{}}>
                {!data.auth ? 
                <UpdatePlaid plaidItemId={data.plaidItemId}></UpdatePlaid> 
                : 
                <></>}
              </td>
            </tr>
          )}
        </tbody>
        </Table>
    </div>  
  )

}

export default AccountConnection