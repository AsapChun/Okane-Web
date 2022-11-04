import { AccountBase, AccountType, AccountSubtype } from "plaid";
import {Table} from "react-bootstrap"

interface PropsInterface {
    userAccounts: AccountBase[],
    accountType: string,
    plaidLinked: string;
    accountDataLoaded: boolean;
}

const AccountBreakdown: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  
    let displayAccounts = props.userAccounts;
    let plaidLinked = props.plaidLinked;
    if(plaidLinked === "false" && !props.accountDataLoaded){
      displayAccounts = [
        {
          account_id: "XnkzrJe6eJS374mdVbrXiKBZP1r8BLUPoPxWG",
          balances: {
              available: 100,
              current: 110,
              iso_currency_code: "USD",
              limit: null,
              unofficial_currency_code: null
          },
          mask: "0000",
          name: "Plaid Checking",
          official_name: "Plaid Gold Standard 0% Interest Checking",
          subtype: AccountSubtype.Checking,
          type: AccountType.Depository
        },
        {
          account_id: "DaQxBXL6LXiAbmPxXEj8tdNGWoygNXiEjEXPk",
          balances: {
              available: 200,
              current: 210,
              iso_currency_code: "USD",
              limit: null,
              unofficial_currency_code: null
          },
          mask: "1111",
          name: "Plaid Saving",
          official_name: "Plaid Silver Standard 0.1% Interest Saving",
          subtype: AccountSubtype.Savings,
          type: AccountType.Depository
        },
        {
          account_id: "VAKlqJj6jJtZPdnjwybKsNBlGq9QBWipGpn8X",
          balances: {
              available: null,
              current: 1000,
              iso_currency_code: "USD",
              limit: null,
              unofficial_currency_code: null
          },
          mask: "2222",
          name: "Plaid CD",
          official_name: "Plaid Bronze Standard 0.2% Interest CD",
          subtype: AccountSubtype.Cd,
          type: AccountType.Depository
        },
      ]
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
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {displayAccounts.map((data) => 
            <tr key={data.id} style ={{
                fontFamily: 'Poppins',
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "15px",
            }}>
              <td className="text-nowrap" style ={{}}>
                <div>{data.name}</div>
              </td>
              <td className="text-nowrap" style ={{}}>
                <div>{data.subtype}</div>
              </td>
              <td className="text-nowrap" >${Math.round(Math.abs(data.balances.current!))}</td>
            </tr>
          )}
        </tbody>
        </Table>
    </div>  
  )

}

export default AccountBreakdown