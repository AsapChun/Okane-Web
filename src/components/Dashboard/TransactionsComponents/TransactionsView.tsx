import { Col, Row} from "react-bootstrap";
import './TransactionsView.css';
import TransactionsTable from './TransactionsTable'
import { Transaction } from "plaid";
import { useState, useEffect } from 'react';
import { isNonEssentialSpend, isEssentialSpend } from "../Models";


interface TransactionData {
    category: string;
    transactionData: Transaction;
  }

interface PropsInterface  {
    plaidLinked: string;
    isVisible: string;
    displayTransactions: TransactionData[];
    discretionaryTransactions: TransactionData[];
    transactionsDataLoaded: boolean;
}


const TransactionsView: React.FC<PropsInterface> = (
    props: PropsInterface
) => {

    const tableEssentialCategoriesList = Array.from(isEssentialSpend);
    const tableNonEssentialCategoriesList = Array.from(isNonEssentialSpend);

      // Controllers whether if the Popup will be displayed: false (nothing opened), true (vice versa)
    const [categoryFileteredAction, setcategoryFileteredAction] = useState(false);
    const [categorySort, setCategorySort] = useState("All Categories");
    const [nonEssentialTransactionList, setNonEssentialTransactionList] = useState(props.discretionaryTransactions);
    const [essentialTransactionsList, setEssentialTransactionList] = useState(props.displayTransactions);


    useEffect(() => {
        setEssentialTransactionList(props.displayTransactions )
        setNonEssentialTransactionList(props.discretionaryTransactions)
    }, [props.displayTransactions, props.discretionaryTransactions])
    

    const changeCategoryFilterNonEssential = (category : string) => {
        if (category == "All Categories"){
            setcategoryFileteredAction(true);
            setNonEssentialTransactionList(props.discretionaryTransactions);
            setCategorySort("All Categories");
        } else {
            let filteredTransactions = props.discretionaryTransactions.filter(function isCategory(transaction) {
            return transaction.category === category;
            });
            if (category === "" ) {
            filteredTransactions = props.discretionaryTransactions
            }
            setcategoryFileteredAction(true);
            setNonEssentialTransactionList(filteredTransactions);
            setCategorySort(category);
        }
    }

    const changeCategoryFilterEssential = (category : string) => {
        if (category === "All Categories"){
            setcategoryFileteredAction(true);
            setEssentialTransactionList(props.displayTransactions);
            setCategorySort("All Categories");
        } else {
            let filteredTransactions = props.displayTransactions.filter(function isCategory(transaction) {
            return transaction.category === category;
            });
            if (category === "" ) {
            filteredTransactions = props.displayTransactions
            }
            setcategoryFileteredAction(true);
            setEssentialTransactionList(filteredTransactions);
            setCategorySort(category);
        }
    }

    const [essentialSpendButton, setEssentialActive] = useState("btn_toggle_on");
    const [nonEssentialSpendButton, setNonEssentialActive] = useState("btn_toggle_off");

    useEffect(() => {
        setEssentialTransactionList(props.displayTransactions )
        setNonEssentialTransactionList(props.discretionaryTransactions)
        setCategorySort("All Categories")
    }, [essentialSpendButton, nonEssentialSpendButton])

    const[essentialSpendDiv, updateEssentialSpendDiv] = useState("doDisplay");
    const[nonEssentialSpendDiv, updateNonEssentialSpendDiv] = useState("noDisplay noDisplayVisibility");

    const buttonHandlerEssential = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setEssentialActive("btn_toggle_on")
        setNonEssentialActive("btn_toggle_off")
        updateNonEssentialSpendDiv("noDisplay")
        setTimeout(function(){
            updateEssentialSpendDiv("doDisplay")
        }, 500)
     };

     const buttonHandlerNonEssential = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setEssentialActive("btn_toggle_off")
        setNonEssentialActive("btn_toggle_on")
        updateEssentialSpendDiv("noDisplay")
        setTimeout(function(){
            updateNonEssentialSpendDiv("doDisplay")
        }, 500)
     };
    
    return(
        <>
            <Row className={props.isVisible} style={{
                        display: "block",
                        minWidth: "1000px",
                        width: "100%",
                        maxWidth: "100%",
                        margin: "0px !important",
                        padding: "0px !important"
            }}>
                <Row style={{
                        display: "block",
                        minWidth: "1000px",
                        width: "100%",
                        maxWidth: "100%",
                        margin: "0px",
                        height: "50px"
                    }}>
                    <button onClick={buttonHandlerEssential} className = {essentialSpendButton}>Essential spend</button>
                    <button id = "nonEssentialSpendButton" onClick={buttonHandlerNonEssential} className = {nonEssentialSpendButton}>Non-essential spend</button> 
                </Row>

                <Col className="vh-100" style = {{
                    background: "#FFFFFF",
                    border: "none",
                    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                    minHeight: "475px",
                    maxHeight: "475px",
                    height: "100%",
                    maxWidth: "100%",
                    width: "100%",
                    minWidth: "1000px",
                    marginBottom: "20px",
                    marginLeft: "0px !important",
                    padding: "0px !important"
                }}>
                {essentialSpendButton === "btn_toggle_on" ?
                <div>
                    <Row style={{
                        margin: "0px",
                        paddingBottom: "5px",
                        paddingTop: "5px",
                        position: "sticky",
                        backgroundColor: "white",
                        zIndex: "10",
                        top: "0px"
                    }}>
                        <div className="categoryToggleRowDiv">
                            {tableEssentialCategoriesList.map((category) => 
                                <>
                                    <div className="categoryToggleDiv">
                                        <img onClick={(e) => changeCategoryFilterEssential(category)} className= {category == categorySort ? "categoryToggleIconSelected" : "categoryToggleIcon"} src={window.location.origin + "/images/Icons/" + category + ".png"}></img>
                                        <div>
                                            {category}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Row>
                    <Row style={{
                        height: "100%",
                        display: "block",
                        margin: "0px",
                        padding: "0px !important"
                    }}>
                        <div>
                            <TransactionsTable plaidLinked={props.plaidLinked}
                            displayTransactions={essentialTransactionsList}
                            essentialCategory={"Essential Spend"}
                            categoryFilteredAction={categoryFileteredAction}
                            categorySort={categorySort}
                            ></TransactionsTable>
                        </div>
                  </Row>
                </div>
                :
                <div>
                    <Row className="flex-nowrap" style={{
                        margin: "0px",
                        paddingBottom: "5px",
                        paddingTop: "5px",
                        position: "sticky",
                        backgroundColor: "white",
                        zIndex: "10",
                        top: "0px"
                    }}>
                        <div className="categoryToggleRowDiv">
                            {tableNonEssentialCategoriesList.map((category) => 
                                <>
                                    <div className="categoryToggleDiv">
                                        <img onClick={(e) => changeCategoryFilterNonEssential(category)} className= {category == categorySort ? "categoryToggleIconSelected" : "categoryToggleIcon"} src={window.location.origin + "/images/Icons/" + category + ".png"}></img>
                                        {category}
                                    </div>
                                </>
                            )}
                        </div>
                    </Row>
                    <Row style={{
                    height: "100%",
                    display: "block",
                    margin: "0px",
                    padding: "0px !important"
                        }}>
                        <div>
                            <TransactionsTable plaidLinked={props.plaidLinked}
                            displayTransactions={nonEssentialTransactionList}
                            essentialCategory={"Non-Essential Spend"}
                            categoryFilteredAction={categoryFileteredAction}
                            categorySort={categorySort}
                            ></TransactionsTable>
                        </div>
                    </Row>
                </div>
                }
                </Col>
            </Row>
        </>
    )
}

export default TransactionsView