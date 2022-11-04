import { Card , Spinner, Table, Row,} from "react-bootstrap"
import { default as dayjs } from 'dayjs'
import { Transaction, } from "plaid"
import TransactionRow from "../TransactionsComponents/TransactionRow"
import { useEffect, useState } from "react";
import { newAllCategoriesList } from "../Models";

interface TransactionData {
  category: string;
  transactionData: Transaction;
}

interface PropsInterface  {
  displayTransactions: TransactionData[],
  plaidLinked: string,
  essentialCategory: string,
  categoryFilteredAction: boolean,
  categorySort: string,
}

const TransactionsTable: React.FC<PropsInterface> = (
  props: PropsInterface
) => {


  // Controllers whether if the Popup will be displayed: false (nothing opened), true (vice versa)
  const [categoryFileteredAction, setcategoryFileteredAction] = useState(false);
  const [tablePopupController, changeTablePopupController] = useState(false);
  const [categorySort, setCategorySort] = useState("");
  const [transactionsList, setTransactionList] = useState(props.displayTransactions);

  useEffect(() => {
    setcategoryFileteredAction(props.categoryFilteredAction);
    setTransactionList(props.displayTransactions);
    setCategorySort(props.categorySort);
  }, [props.categoryFilteredAction, props.displayTransactions, props.categorySort])



  let customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat);
  let weekOfYear = require('dayjs/plugin/weekOfYear');
  dayjs.extend(weekOfYear);
  let transactionId = 0;
  const tableAllCategoriesList = Array.from(newAllCategoriesList);
  tableAllCategoriesList.unshift("All");
  return(
    <>
    <div>
      <Card className="border-0" style={{
      }}>
        {props.displayTransactions.length === 0 && !categoryFileteredAction ? 
          <Row style={{
            paddingLeft: "20px"
          }}>
            <Spinner animation="grow" size="sm"/>
            <Spinner animation="grow" size="sm"/> 
            <Spinner animation="grow" size="sm"/> 
            Loading 
          </Row>
          : 
          <></>
        }
        <Card.Body className="table-full-width table-responsive" >
          <Table className="table-hover" style={{width: "100%"}}>
          <thead>
            <tr className = "tableHeaderDiv">
              <th className="tableHeader" scope="col">Date</th>
              <th className="tableHeader" scope="col">Vendor</th>
              <th className="tableHeader" scope="col">Account</th>
              <th className="tableHeader" scope="col">Category</th>
              <th className="tableHeader" scope="col">Amount</th>
              <th className="tableHeader" scope="col"></th>
            </tr>
          </thead>
            <tbody>
                {!categoryFileteredAction ? 
                  props.displayTransactions.map((data) => 
                    <>
                      <tr key={transactionId+=1} style ={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "15px",
                        }}>
                        </tr>
                        <TransactionRow
                          transactionInput={data}
                          tablePopupController={tablePopupController}
                          changeTablePopupController={changeTablePopupController}
                        ></TransactionRow>
                    </>
                  ) : 
                  transactionsList.map((data) => 
                    <>
                      <tr key={transactionId+=1} style ={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "15px",
                        }}>
                        </tr>
                        <TransactionRow
                          transactionInput={data}
                          tablePopupController={tablePopupController}
                          changeTablePopupController={changeTablePopupController}
                        ></TransactionRow>
                    </>
                  )
                }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>  
    </>
  )

}

export default TransactionsTable