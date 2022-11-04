import React, { Component } from 'react';
import './Dashboard.css'
import { getFunctions, httpsCallable } from 'firebase/functions';
import Navbars from './Navbars';
import { Container, Row,  Card,Col,  Table, Spinner} from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, PointElement, LineElement, Title, LinearScale } from 'chart.js';
import SavingsGoals from './DashboardComponents/SavingsGoals'

/*
  For some reason removing this file breaks everything. Figure out how to delete safely later
*/


type Props = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

type MyState = {
  loadingBudgetInfo: boolean,
  budgetInfo: budgetInfo,
  transactionsLoadingState: boolean,
  recentTransactions: displayTransaction[],
  accountsInfoLoadingState: boolean,
  accountsInfo: AccountObject[],
  spendingChartLoadingState: boolean,
  pieChartLoadingState: boolean,
  currentMonthSpend: number,
  chartSpendList: number[]
}

interface AccountObject {
  id: number,
  name: string,
  type: string,
  subtype: string,
  balance: number,
}

interface budgetInfo {
  incomeData: number,
  spendingData: number,
  savingsData: number,
}

interface dateObject {
  startDate: string,
  endDate: string
}

interface displayTransaction {
  id: number
  name: string,
  amount: number,
  date: string
}
interface parsedTransaction {
  transactionId: string,
  amount: number;
  date: string;
  category: string[] | null;
  categoryId: string | null;
  name: string;
  merchantName: string | null | undefined;
  paymentChannel: string;
  personalFinanceCategory: {
    primary: string,
    detailed: string
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip, 
  Legend
);

const functions = getFunctions();

class Dashboard extends Component<Props, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      budgetInfo: {
        incomeData: 0,
        spendingData: 0,
        savingsData: 0,
      },
      loadingBudgetInfo: true,
      transactionsLoadingState: true,
      recentTransactions: [],
      accountsInfoLoadingState: true,
      accountsInfo: [],
      spendingChartLoadingState: true,
      pieChartLoadingState: true,
      currentMonthSpend: 0,
      chartSpendList: [0, 0, 0, 0, 0]
    };
    
    this.getBudget = this.getBudget.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.getBalance =  this.getBalance.bind(this);
    this.getAccountBalance = this.getAccountBalance.bind(this);
  }

  getBudget = httpsCallable(functions, 'getBudget');
  getTransactions = httpsCallable(functions, 'getTransactions');
  getBalance = httpsCallable(functions, 'getBalance');

  calculateWeekDate(){
    var today = new Date();
    var oneWeekBeforeToday = new Date();
    oneWeekBeforeToday.setDate(oneWeekBeforeToday.getDate()- 7);
    var end_date = today.toISOString().slice(0, 10);
    var start_date = oneWeekBeforeToday.toISOString().slice(0, 10)
    let date_object : dateObject = {
        startDate: start_date,
        endDate: end_date
    }
    return date_object;
  }
  calculateMonthDate = (monthOffset: number) => {
    const today = new Date();
    // Change Month by monthOffset
    today.setMonth(today.getMonth()-monthOffset);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth()+1, 0);
    var start_date = firstDayOfMonth.toISOString().slice(0, 10);
    var end_date = lastDayOfMonth.toISOString().slice(0, 10)
    const date = {
      startDate: start_date,
      endDate: end_date,
    };
    return date;
  };

  async getBudgetInfo() {
    let budgetInfo = await this.getBudget().then((result) => {
      let data : any = result.data;
      let budgetResponse : budgetInfo = {
        incomeData: data.incomeData,
        spendingData: data.spendingData,
        savingsData: data.savingsData,
      }
      return budgetResponse;
    }).catch(ex => {
      console.error(ex);
    })
    return budgetInfo;
  }

  async loadTransactions(date : dateObject) {
    let transactions = await this.getTransactions({start_date: date.startDate, end_date: date.endDate}).then((result) => {
      let data : any = result.data;
      let allTransactions = data.transaction.ALL_TRANSACTIONS;
      if(allTransactions){
        return allTransactions;
      } else {
        return null
      }
    }).catch(ex => {
      console.error(ex)
      return new Error(ex);
    })

    return new Promise((resolve) => {
      resolve(transactions);
    })
  }

  async getAccountBalance() {
    console.log("FETCHING ACCOUNT BALANCES")
    let accountName = await this.getBalance().then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        // setBalance(result.data);
        let accountObjectList : AccountObject[]= []
        let data : any = result.data;
        
        let balances = data.balances;
        let i = 0;
        for(const balance of balances) {
          for(const account of balance.accounts){
              let accountObject : AccountObject = {
                  id: i,
                  name: account.name,
                  type: account.type,
                  subtype: account.subtype,
                  balance: account.balances.current,
              }
              accountObjectList.push(accountObject);
              i++
          }
        }
        return accountObjectList;
    }).catch(ex => {
        console.log("balance error:", ex)
    })
    return accountName;
}

  async componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    /*
      Load User Stored Budget Info
    */
    let budgetInfo = await this.getBudgetInfo();
    if (budgetInfo) {
      this.setState({
        budgetInfo: budgetInfo,
        loadingBudgetInfo: false,
      })
    }
    /*
      Load User Past Months's Transactions
    */
    const monthDates = this.calculateMonthDate(0);
    const firstDateOfMonth = new Date(monthDates.startDate);
    let monthlySpendList : any[]= [0, 0, 0 , 0, 0];
    let monthlyWeeklyDates = [];
    monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
    monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
    monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
    monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
    let loadedTransactions = await this.loadTransactions(monthDates);
    if (loadedTransactions as parsedTransaction[]) {
      let thisMonthSpend = 0;
      let i : number = 0;
      let displayTransactionsList : displayTransaction[] = [];
      for(const transaction of loadedTransactions as parsedTransaction[]){
        if ((transaction.personalFinanceCategory.primary === "TRANSFER_IN" 
        || transaction.personalFinanceCategory.primary === "TRANSFER_OUT"
        || transaction.personalFinanceCategory.primary === "LOAN_PAYMENTS"
        ) && !(transaction.personalFinanceCategory.primary === "TRANSFER_OUT" && transaction.category!.includes('Third Party'))){
          continue;
        }
        const transactionDate = new Date(transaction.date);
        if (transactionDate <= monthlyWeeklyDates[0]) {
          monthlySpendList[1] += Math.abs(transaction.amount);
        } else if (transactionDate <= monthlyWeeklyDates[1]) {
          monthlySpendList[2] += Math.abs(transaction.amount);
        } else if (transactionDate <= monthlyWeeklyDates[2]) {
          monthlySpendList[3] += Math.abs(transaction.amount);
        } else if (transactionDate <= monthlyWeeklyDates[3]) {
          monthlySpendList[4] += Math.abs(transaction.amount);
        }
        
        thisMonthSpend += transaction.amount;
        let displayTransaction: displayTransaction = {
          id: i,
          name: transaction.name,
          date: transaction.date,
          amount: transaction.amount,
        }
        displayTransactionsList.push(displayTransaction);
        i++;
      }
      let todayDate = new Date();
      if (todayDate < monthlyWeeklyDates[1]) {
        monthlySpendList[2] = null;
        monthlySpendList[3] = null;
        monthlySpendList[4] = null;
      } else {
        monthlySpendList[2] += monthlySpendList[1]
      } 
      if (todayDate < monthlyWeeklyDates[2]) {
        monthlySpendList[3] = null;
        monthlySpendList[4] = null;
      } else {
        monthlySpendList[3] += monthlySpendList[2]
      } 
      if (todayDate < monthlyWeeklyDates[3]) {
        monthlySpendList[4] = null;
      } else {
        monthlySpendList[4] += monthlySpendList[3]
      }

      this.setState(
        {
          transactionsLoadingState: false,
          recentTransactions: displayTransactionsList,
          currentMonthSpend: thisMonthSpend,
          pieChartLoadingState: false,
          chartSpendList: monthlySpendList
        }
      )
    }
    /*
      Load User Account Info and Balances
    */
    let loadedAccountInfo = await this.getAccountBalance();
    if (loadedAccountInfo) {
      this.setState({
        accountsInfoLoadingState: false,
        accountsInfo: loadedAccountInfo
      })
    }
  }

  render() {
    return (
      <div>
        {/* <Navbars setIsAuth={this.props.setIsAuth}/> */}
        <div>
            <Container fluid>
              <Row>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">Spending Overview</Card.Title>
                      <p className="card-category">You have <b>${this.state.budgetInfo.spendingData - this.state.currentMonthSpend}</b> left to spend this month! 
                      You are on track to save <b>${this.state.budgetInfo.incomeData - this.state.budgetInfo.spendingData}</b>.</p>
                    </Card.Header>
                    <Card.Body>
                      {!this.state.spendingChartLoadingState ? 
                        <div>
                          <div className='BoldHeader'>Loading</div>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                        </div> :
                        <div>
                          <Line
                            options={
                              {
                                  responsive: true,
                                  plugins: {
                                    legend: {
                                        position: 'bottom' as const,
                                    },
                                    title: {
                                        display: true,
                                        text: 'This Month Spend',
                                    },
                                    filler: {
                                      propagate: false
                                    }
                                  },
                                  scales: {
                                      x: {
                                          beginAtZero: true,
                                          grid: {
                                            display: false
                                          }
                                      },
                                      y: {
                                          beginAtZero: true,
                                          grid: {
                                            display: false
                                          },
                                          ticks: {
                                            count: 3
                                          },
                                          max: this.state.budgetInfo.incomeData > Math.max(...this.state.chartSpendList)
                                                ? (Math.floor((this.state.budgetInfo.incomeData / 500)) + 1) * 500
                                                : (Math.floor((Math.max(...this.state.chartSpendList) / 500)) + 1) * 500
                                      }
                                  },
                              }
                            }
                            data={
                              {
                                labels: ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
                                datasets: [
                                  {
                                    label: 'Current Month Spending',
                                    data: this.state.chartSpendList,
                                    borderColor: 'rgb(75, 192, 192)',
                                    backgroundColor: 'rgb(75, 192, 192)',
                                    pointHoverBorderColor: 'rgb(75, 192, 192)',
                                    tension: 0.4
                                  },
                                  {
                                      label: 'Monthly Spend Goal',
                                      data: [this.state.budgetInfo.spendingData, this.state.budgetInfo.spendingData, this.state.budgetInfo.spendingData, this.state.budgetInfo.spendingData, this.state.budgetInfo.spendingData],
                                      borderColor: 'rgb(45, 58, 111)',
                                      backgroundColor: 'rgb(45, 58, 111)',
                                      pointHoverBorderColor: 'rgb(45, 58, 111)',
                                      borderDash: [10,10],
                                      tension: 0.4
                                  },
                                  {
                                    label: 'Monthly Income',
                                    data: [this.state.budgetInfo.incomeData, this.state.budgetInfo.incomeData, this.state.budgetInfo.incomeData, this.state.budgetInfo.incomeData, this.state.budgetInfo.incomeData],
                                    borderColor: 'rgb(164, 172, 204)',
                                    backgroundColor: 'rgb(164, 172, 204)',
                                    pointHoverBorderColor: 'rgb(164, 172, 204)',
                                    tension: 0.4
                                  },
                                ],
                              }
                            }
                          >
                          </Line>
                        </div>
                      }
                    </Card.Body>
                    <Card.Footer>
                      <div className="stats">
                        <i className="fas fa-history"></i>
                        {!this.state.spendingChartLoadingState ? "Loading..." : "Up To Date"}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col md="6">
                  <SavingsGoals/>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">This Month's Transactions</Card.Title>
                      <p className="card-category">See All My Transactions</p>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0 my-custom-scrollbar ">
                      {this.state.transactionsLoadingState ? 
                        <div>
                          <div className='BoldHeader'>Loading</div>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                        </div>
                        :
                        <Table className="table-hover table-striped">
                          <thead>
                            <tr>
                              <th className="border-0">Date</th>
                              <th className="border-0">Name</th>
                              <th className="border-0">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                              {this.state.recentTransactions.map((data) => 
                                <tr key={data.id}>
                                  <td>{data.date}</td>
                                  <td>{data.name}</td>
                                  <td>${Math.abs(data.amount)}</td>
                                </tr>
                              )}
                          </tbody>
                      </Table>
                        
                      }
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-check"></i>
                        {this.state.transactionsLoadingState ? "Loading..." : "Up To Date"}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col md="6">
                <Card>
                    <Card.Header>
                      <Card.Title as="h4">Connected Accounts</Card.Title>
                      <p className="card-category">Type of Account and Balance</p>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0 my-custom-scrollbar ">
                      {this.state.accountsInfoLoadingState ? 
                        <div>
                          <div className='BoldHeader'>Loading</div>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                          <Spinner animation="grow" size="sm" variant="primary"/>
                        </div> 
                        :
                        <Table className="table-hover table-striped">
                          <thead>
                            <tr>
                              <th className="border-0">Account Name</th>
                              <th className="border-0">Account Type</th>
                              <th className="border-0">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.accountsInfo.map(account =>  
                              <tr key={account.id}>
                                <td>{account.name}</td>
                                <td>{account.subtype}</td>
                                <td>${account.balance}</td>
                              </tr>
                            )}
                          </tbody>
                      </Table>}
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-check"></i>
                        {this.state.accountsInfoLoadingState ? "Loading..." : "Up To Date"}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
          </Container>
        </div>
      </div>
    )
  }
}
export default Dashboard