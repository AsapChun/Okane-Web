import { Col, Row} from "react-bootstrap";
import './AccountsView.css';
import AccountBreakdown from './AccountBreakdown'
import { AccountBase } from "plaid";
import { InstituitonObject } from "../DashboardRedesign";
import AccountConnection from "./AccountConnection";


interface PropsInterface  {
    plaidLinked: string;
    isVisible: string;
    accountObjects: AccountBase[];
    netWorth: number;
    accountDataLoaded: boolean;
    institutionObjectList: InstituitonObject[],
}

const AccountsView: React.FC<PropsInterface> = (
    props: PropsInterface
) => {
    
    return(
        <Row className={props.isVisible} style={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: "500px",
            margin: "0px !important"
        }}>
            <Col className="vh-100" style = {{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "5px",
                height: "100%",
                overflow: "auto",
                padding: "15px",
                paddingTop: "5px",
                maxWidth: "100%",
                minWidth: "600px",
                marginBottom: "20px"
            }}>
                <Row style={{
                    height: "100%",
                    margin: "0px",
                    display: "block"
                }}>
                    <AccountBreakdown
                        plaidLinked={props.plaidLinked}
                        accountType={"Connected Account Balances"}
                        userAccounts={props.accountObjects}
                        accountDataLoaded={props.accountDataLoaded}
                    />
                </Row>
            </Col>
            <Col className="vh-100" style = {{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "5px",
                height: "100%",
                overflow: "auto",
                padding: "15px",
                paddingTop: "5px",
                maxWidth: "100%",
                minWidth: "600px",
                marginBottom: "20px"
            }}>
                <Row style={{
                    height: "100%",
                    margin: "0px",
                    display: "block"
                }}>
                    <AccountConnection
                        plaidLinked={props.plaidLinked}
                        accountType={"Instituiton Connection Status"}
                        userAccounts={props.institutionObjectList}
                        accountDataLoaded={props.accountDataLoaded}
                    />
                </Row>
            </Col>
        </Row>
    )
}

export default AccountsView