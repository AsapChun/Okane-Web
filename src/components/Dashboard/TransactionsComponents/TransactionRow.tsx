import { Col, Row} from "react-bootstrap"
import { Transaction, } from "plaid"
import { useEffect, useState, useRef} from 'react';
import { newAllCategoriesList} from '../Models';
import { getFunctions, httpsCallable } from "firebase/functions";


interface TransactionData {
    category: string;
    transactionData: Transaction;
  }

interface PropsInterface  {
    transactionInput: TransactionData,
    tablePopupController: boolean,
    changeTablePopupController: (name:boolean) => void, 
}

const functions = getFunctions();
const updateTransactionCategory = httpsCallable(functions, 'updateTransactionCategory');
// const deleteTransaction = httpsCallable(functions, "deleteTransaction");
  
const TransactionsRow: React.FC<PropsInterface> = (
    props: PropsInterface
) => {

  const [categoryToChangeID, changeCategoryID] = useState("")
  const [newCategoryURL, changeCategoryURL] = useState("")
  const [detailID, changedetailID] = useState("");
  const transactionId = props.transactionInput.transactionData.transaction_id;
  const tablePopupController = props.tablePopupController;

  const buttonHandlerEssential = (e: React.MouseEvent<HTMLButtonElement>, transactionId: string) => {
    e.preventDefault();
    if (tablePopupController) {
        changedetailID("");
    } else {
        props.changeTablePopupController(true);
        changedetailID("");
        changedetailID(transactionId);
    }
  };

  const changeCategoryButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>, category: string, transactionId: string) => {
    e.preventDefault();
    changeCategoryID(transactionId);
    changeCategoryURL(category)
    changedetailID("");
    props.changeTablePopupController(false);
    updateTransactionCategory({transaction_id: transactionId, category: category}).then((res) => {
        console.log("updateTransactionCategory", res.data);
    }).catch((error) => {
        console.log("Unable to update Transaction", error);
    })
  };

  const closeCategoryDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.changeTablePopupController(false);
    changedetailID("");
  };

  const categoryRowsHelperList = [3, 6, 9, 12, 15];

  const firstUpdate = useRef(true);
  useEffect(() => {
    firstUpdate.current = false
  }, []);


return(
    <>
    <td className="tableContent" style = {{
        width: "10%"
    }}>
        <div style = {{
            color: "#0D268A",
            fontSize: "10px"
        }}>{props.transactionInput.transactionData.pending === false ? "" : "pending"}</div>
        <div style = {{
            whiteSpace: "nowrap"
        }}>{props.transactionInput.transactionData.date}</div>
        </td>
    <td className="tableContent" style={{
        width: "35%"
    }}> 
        <div>{props.transactionInput.transactionData.name}</div>
    </td>
    <td className="tableContent" style={{
        width: "20%"
    }}>
        <div>{props.transactionInput.transactionData.account_id}</div>
    </td>
    <td className="tableContentCategory" style={{
        width: "10%"
    }} >
        <Col style={{
            padding: "0px",
            flexBasis: "0",
            flexGrow: "0",
            paddingLeft: "0px"
        }}>
            <img className = "categoryImage" src={` ${(categoryToChangeID === transactionId && props.transactionInput.category !== undefined) ? 
                                                    window.location.origin + "/images/Icons/" + newCategoryURL.replace(/_/g, " ") + ".png"
                                                    : window.location.origin + "/images/Icons/" + props.transactionInput.category + ".png"} `} alt=""></img>
            <div className = "tableContentCategoryName">
                {` ${categoryToChangeID === props.transactionInput.transactionData.transaction_id ? 
                newCategoryURL :
                props.transactionInput.category
                } `}
            </div>                                        
        </Col>
    </td>
    <td className="tableContent" style={{
        width: "7%"
    }} >
        ${Math.round((props.transactionInput.transactionData.amount))}
    </td>
    <td className="tableContent" style={{
        width: "3%"
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#655B96" className="bi bi-three-dots" viewBox="0 0 16 16" style={{
                top: "35px",
                position: "relative"
            }}>
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
        <button className = "buttonExpandTable" onClick={(e) => buttonHandlerEssential(e, transactionId)}/>
            <div className = {` ${detailID === transactionId ? "showDetailPopup" : "hideDetailPopup"} `} >
            {/* <button className = "deleteTransactionDetail">
                Delete Transaction
            </button> */}
            <div className = "closeDetail">
                <button onClick={(e) => closeCategoryDetails(e)} className = "closeDetailButton">
                    Close
                </button>
            </div>
            <div className = "changeTransactionDetail">
                <Row className = "changeTransactionLead">
                    Change Transaction's Category
                </Row>
                {categoryRowsHelperList.map((number) => 
                    <Row className = "searchGrid">
                        {Array.from(newAllCategoriesList).slice(number-3,number).map((category) => 
                        <Col className = "searchGrindPlace">
                            <button className = "buttonSelectGrid" onClick={(e) => changeCategoryButtonHandler(e, category , transactionId)}>
                            <Row className = "noMarginRow">
                                <img className = "searchGridIcon" src={window.location.origin + `/images/Icons/${category}.png`} alt=""></img>
                            </Row>
                            <Row className = "noMarginRow categoryName">
                                {category}
                            </Row>
                            </button>
                        </Col>
                        )}
                    </Row>
                )}
            </div>
            </div>
    </td>
    </>
)
}

export default TransactionsRow