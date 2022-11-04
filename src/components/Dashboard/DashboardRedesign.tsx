import { Container, Row} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import DashboardView from "./DashboardComponents/DashboardView"
import AccountsView from "./AccountsComponents/AccountsView"
import TransactionsView from "./TransactionsComponents/TransactionsView";
import LoadingComponents from "./LoadingComponents";
import { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import {AccountBase, Transaction} from "plaid";
import Navbars from "./Navbars";
import "./Dashboard.css"
import mixpanel from './../../models/mixpanel'
import { nonDiscretionaryTransactions, displayTransactions, demoCategories } from "./DashboardComponents/demoModels";
import { isNonEssentialSpend } from "../Dashboard/Models";

export interface TransactionData {
  category: string;
  transactionData: Transaction;
}

const discretionaryCategories : Set<string> = new Set(isNonEssentialSpend);
const calculateMonthDate = (monthOffset: number) => {
  const today = new Date();
  // Change Month by monthOffset
  today.setMonth(today.getMonth()-monthOffset);
  const today2 = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today2.getFullYear(), today2.getMonth()+1, 0);
  var start_date = firstDayOfMonth.toISOString().slice(0, 10);
  var end_date = lastDayOfMonth.toISOString().slice(0, 10)
  const date = {
    startDate: start_date,
    endDate: end_date,
  };
  return date;
};

const functions = getFunctions();
const getTransactions = httpsCallable(functions, 'getTransactions');
const getTotalSpending = httpsCallable(functions, 'getTotalSpendings');
const getBalance = httpsCallable(functions, 'getBalance'); 
const getValidatePlaidLinked = httpsCallable(functions, 'validatePlaidLinked');
let demoOn = false;

interface dateObject {
  startDate: string,
  endDate: string
}

type MyProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export interface InstituitonObject {
  institutionName: string,
  institutionId: string,
  consentExpirationTime?: string,
  plaidItemId: string,
  auth: boolean,
}

export default function DashboardRedesign(props: MyProps) {
  const emptyInstituitonObjectList: InstituitonObject[] = [];
  const emptyAccountObjectList : AccountBase[] = [];
  const [spendingData, setSpendingData] = useState(undefined);
  const [spendingDataLoaded, setSpendingDataLoaded] = useState(false);
  const [nonDiscretionaryList, setDisplayTransactions] = useState(nonDiscretionaryTransactions);
  const [discretionaryTransactions, setDiscretionaryDisplayTransactions] = useState(displayTransactions);
  const [recentTransactions, setRecentTransactions] = useState(displayTransactions);
  const [transactionsDataLoaded, setTransactionsDataLoaded] = useState(false);
  const [accountObjectList, setAccountObjectList] = useState(emptyAccountObjectList);
  const [accountDataLoaded, setAccountDataLoaded] = useState(false);
  const [institutionObjectList, setInstitutionObjectList] = useState(emptyInstituitonObjectList);
  const [netWorth, setNewWorth] = useState(0);
  const [plaidLinked, setPlaidLinked] = useState("false");
  const [loadingPlaidLinked, setLoadingPlaidLinked] = useState(false);


  const loadTransactions = async (date : dateObject, accountInput: AccountBase[]) => {
    let transactions = await getTransactions({start_date: date.startDate, end_date: date.endDate}).then((result) => {
        let data : any= result.data;
        let transactionList : TransactionData[] = [];
        let nonDiscretionaryTransactionList : TransactionData[] = [];
        let discretionaryTransactionList : TransactionData[] = [];
        for (const d of data ) {
          accountInput.forEach(function(element){ 
            if(element.account_id == d.transactionData.account_id){
              d.transactionData.account_id = element.name + " | " + element.mask
            }
          });
          transactionList.push(d);
          const category = d.category;
          if (discretionaryCategories.has(category)) {
            discretionaryTransactionList.push(d);
          } else {
            nonDiscretionaryTransactionList.push(d);
          }
        }
        transactionList.sort(function(a, b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.transactionData.date).valueOf() - new Date(a.transactionData.date!).valueOf();
        });
        nonDiscretionaryTransactionList.sort(function(a, b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.transactionData.date).valueOf() - new Date(a.transactionData.date!).valueOf();
        });
        discretionaryTransactionList.sort(function(a: TransactionData,b: TransactionData){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.transactionData.date).valueOf() - new Date(a.transactionData.date).valueOf();
        });
        setRecentTransactions(transactionList);
        setDisplayTransactions(nonDiscretionaryTransactionList);
        setDiscretionaryDisplayTransactions(discretionaryTransactionList);
        setTransactionsDataLoaded(true);
        return;
    }).catch(ex => {
      console.error(ex)
      return new Error(ex);
    })
    return new Promise((resolve) => {
      resolve(transactions);
    })
  }

  const history = useHistory();

  const validatePlaidLinked = async() => {
    let plaidResponse = await getValidatePlaidLinked().then((result) => {
      let data : any = result.data;
      return data.plaidLinked;
    })
    if(plaidResponse) {
      return "true"
    } else {
      return "false"
    }
  }

  const loadTotalSpendings = async () => {
    let res = await getTotalSpending({start_date: "cyz", end_date: "fdas"}).then((result) => {
      let data : any = result.data;
      if (data && demoOn == false) {
        setSpendingData(data);
        if (data.topFiveDiscretionaryCategories.length > 0) {
          setSpendingDataLoaded(true);
        }
      }
      if (demoOn){
        setSpendingData(demoCategories);
        setSpendingDataLoaded(true);
      }
      return
    }).catch(ex => {
      console.error(ex)
      return new Error(ex);
    })
    return new Promise((resolve) => {
      resolve(res);
    })
  }


  const getAccountBalance = async() => {
    console.log("FETCHING ACCOUNT BALANCES")
    let accountResponse = await getBalance().then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        let accountObjectList : AccountBase[]= []
        let institutionList = [];
        let netWorth : number = 0;
        let itemAccountsData : any = result.data;
        for (const itemAccountData of itemAccountsData) {
          const institutionObject : InstituitonObject = {
            institutionId: itemAccountData.institutionId,
            institutionName: itemAccountData.institutionName,
            plaidItemId: itemAccountData.itemId,
            auth: itemAccountData.auth,
          };
          if (itemAccountData.consentExpirationTime) {
            institutionObject.consentExpirationTime = itemAccountData.consentExpirationTime;
          }
          institutionList.push(institutionObject);
          for (const account of itemAccountData.accountData) {
            accountObjectList.push(account);
            if (account.type === "credit" || account.type === "loan") {
              netWorth -= account.current;
            } else {
              netWorth += account.current;
            }
          }
        }
        return {
          accounts: accountObjectList,
          institutions: institutionList,
          netWorth: netWorth,
        };
    }).catch(ex => {
        console.log("balance error:", ex)
    })
    if (accountResponse) {
      setAccountObjectList(accountResponse.accounts);
      setNewWorth(accountResponse.netWorth);
      setAccountDataLoaded(true);
      setInstitutionObjectList(accountResponse.institutions);
    }
    
    return accountResponse;
}

const[dashboardActive, updateDashboardActive] = useState("subNavText dashboardText textActive");
const[transactionsActive, updateTransactionsActive] = useState("subNavText transactionsText");
const[accountActive, updateAccountActive] = useState("subNavText accountsText");

const[loadingActiveDiv, updateLoadingDiv] = useState("flex-nowrap");
const[dashboardActiveDiv, updateDashboardActiveDiv] = useState("flex-nowrap noDisplay noDisplayVisibility");
const[transactionsActiveDiv, updateTransactionsActiveDiv] = useState("flex-nowrap noDisplay noDisplayVisibility");
const[accountActiveDiv, updateAccountActiveDiv] = useState("flex-nowrap noDisplay noDisplayVisibility");

const[linePosition, updateLinePosition] = useState("subNavDivLine dashboardLineActive");

function hideLoadingDiv(){
  updateLoadingDiv("flex-nowrap noDisplay");
  setTimeout(function(){
    updateLoadingDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateDashboardActiveDiv("flex-nowrap doDisplay");
    updateTransactionsActiveDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateAccountActiveDiv("flex-nowrap noDisplay noDisplayVisibility")
  }, 500)
}

function dashboardClickActive(){
  if (!loadingPlaidLinked) {
    updateDashboardActive("subNavText dashboardText textActive");
    updateTransactionsActive("subNavText transactionsText");
    updateAccountActive("subNavText accountsText")

    updateLoadingDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateDashboardActiveDiv("flex-nowrap doDisplay");
    updateTransactionsActiveDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateAccountActiveDiv("flex-nowrap noDisplay noDisplayVisibility")

    updateLinePosition("subNavDivLine dashboardLineActive")
  }
}

function transactionsClickActive(){
  if (!loadingPlaidLinked) {
    console.log("transactions clicked")
    updateDashboardActive("subNavText dashboardText");
    updateTransactionsActive("subNavText transactionsText textActive");
    updateAccountActive("subNavText accountsText")

    updateLoadingDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateDashboardActiveDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateTransactionsActiveDiv("flex-nowrap doDisplay");
    updateAccountActiveDiv("flex-nowrap noDisplay noDisplayVisibility");

    updateLinePosition("subNavDivLine transactionsLineActive");
  }
}

function accountClickActive(){
  if (!loadingPlaidLinked) {
    updateDashboardActive("subNavText dashboardText");
    updateTransactionsActive("subNavText transactionsText");
    updateAccountActive("subNavText accountsText textActive")

    updateLoadingDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateDashboardActiveDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateTransactionsActiveDiv("flex-nowrap noDisplay noDisplayVisibility");
    updateAccountActiveDiv("flex-nowrap doDisplay");

    updateLinePosition("subNavDivLine accountLineActive");
  }
}

  useEffect(() => {
    setLoadingPlaidLinked(true)
    validatePlaidLinked().then(async (result) => {
      if(result === "true") {
        setPlaidLinked(result);
          getAccountBalance().then(async (accountResult) => {
            // @ts-ignore
            loadTransactions(calculateMonthDate(1), accountResult.accounts).then(async () => {
              loadTotalSpendings().then(async () => {
                hideLoadingDiv();
                // pause 1.5 sec to let graph to load
                setTimeout(function pauseLoading() {setLoadingPlaidLinked(false)},1500);
              })
          })
        })
      } else {
        hideLoadingDiv();
         // pause 1.5 sec to let graph to load
        setTimeout(function pauseLoading() {setLoadingPlaidLinked(false)},1500);
      }
    })
  }, [])

  function goToAddAccounts() {
    localStorage.setItem("oauth_state", "plaid_onboarding");
    localStorage.setItem("from_dashboard", "true");
    mixpanel.setIdentity().then(()=>{
      mixpanel.trackEvent("Add Accounts")
    });
    history.push("/onboarding");
  }

  return(
    <div>
      <Navbars plaidLinked={plaidLinked} setIsAuth={props.setIsAuth}/>
      <Container fluid style ={{
          backgroundColor: "#FFFFFF",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "25px",
          height: "100%",
        }}> 
          {plaidLinked === "false" ? 
            <div className="demoIndicator flex-nowrap">
                <a style={{fontWeight: 600}}>You're in demo mode.</a> Want to see your financial data here instead? Click <a onClick={() => {goToAddAccounts()}}><b><u>here</u></b></a>
            </div> : <></>
          }
          <Row className="flex-nowrap subNavDiv">
            <span className={dashboardActive} onClick={dashboardClickActive}>Dashboard</span>
            <span className={transactionsActive} onClick={transactionsClickActive}>Transactions</span>
            <span className={accountActive} onClick={accountClickActive}>Accounts</span>
          </Row>
          <Row className={linePosition}>
          </Row>
          <div style = {{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "15px",
                marginLeft: "-15px",
                paddingBottom: "10px"
            }}>
            Something missing? You may not have connected all your accounts:<a onClick={() => {goToAddAccounts()}}> <b><u>Add Accounts</u></b></a>
            </div>
          <LoadingComponents
            isVisible={loadingActiveDiv}>
          </LoadingComponents>
          <DashboardView
                  plaidLinked={plaidLinked}
                  displayTransactions= {recentTransactions}
                  isVisible={dashboardActiveDiv}
                  spendingData={spendingData}
                  spendingDataLoaded={spendingDataLoaded}
                  transactionsDataLoaded={transactionsDataLoaded}>        
          </DashboardView>
          <TransactionsView plaidLinked={plaidLinked}
                        isVisible={transactionsActiveDiv}
                        displayTransactions= {nonDiscretionaryList}
                        discretionaryTransactions={discretionaryTransactions}
                        transactionsDataLoaded={transactionsDataLoaded}>
          </TransactionsView>
          <AccountsView plaidLinked={plaidLinked}
                        isVisible={accountActiveDiv}
                        accountObjects={accountObjectList}
                        netWorth={netWorth}
                        accountDataLoaded={accountDataLoaded}
                        institutionObjectList={institutionObjectList}>
          </AccountsView>
      </Container>
    </div>
  )
}