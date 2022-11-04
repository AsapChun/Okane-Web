import { Col, Row} from "react-bootstrap";
import EssentialCategories from "./EssentialCategories";
import SpendingChart from "./SpendingChart";
import { Transaction } from "plaid";

interface displayTransaction {
    id: number
    name: string,
    amount: number,
    essentialCategory: string,
    date: string
  }


  interface TransactionData {
    category: string;
    transactionData: Transaction;
  }


interface PropsInterface  {
    plaidLinked: string;
    displayTransactions: TransactionData[];
    isVisible: string;
    spendingData: any;
    spendingDataLoaded: boolean;
    transactionsDataLoaded: boolean;
}

// let isNextClicked = false;

const DashboardView: React.FC<PropsInterface> = (
    props: PropsInterface
) => {
    return(
        <Row className={props.isVisible} style={{
                    display: "flex",
                    flexWrap: "wrap",
                    minWidth: "1000px",
                    margin: "0px !important"
        }}>
            <Col xs= "6" md="6" style = {{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "5px",
                minHeight: "550px",
                height: "560px",
                overflow: "hidden",
                padding: "15px",
                paddingTop: "5px",
                maxWidth: "100%",
                minWidth: "950px",
                marginBottom: "20px"
            }}>
                <Row>
                    <SpendingChart
                        plaidLinked={props.plaidLinked}
                        spendingData={props.spendingData}
                        spendingDataLoaded={props.spendingDataLoaded}
                    />
                </Row>
            </Col>

            <Col xs= "6" md="6" style = {{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "5px",
                minHeight: "550px",
                height: "560px",
                overflow: "hidden",
                paddingLeft: "10px",
                paddingTop: "5px",
                marginLeft: "15px",
                maxWidth: "350px",
                minWidth: "350px",
                marginBottom: "20px"
            }}>
                <Row>
                    <EssentialCategories
                        spendingData={props.spendingData}
                        spendingDataLoaded={props.spendingDataLoaded}
                    >
                    </EssentialCategories>
                </Row>
            </Col>
        </Row>
    )
}

export default DashboardView