import { getFunctions, httpsCallable } from 'firebase/functions';
import React from 'react';
import './BudgetSetup.css'
import { Alert, Spinner, Col, Container, Form, Row, Popover} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, PointElement, LineElement, Title, LinearScale } from 'chart.js';
import BudgetNavBar from './BudgetNavBar'
import mixpanel from './../../../models/mixpanel'

interface PropsInterface  {
    hideComponent: (name:string) => void
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

interface dateObject {
    startDate: string,
    endDate: string
}

interface MyState {
    incomeData: number,
    spendingData: number,
    savingsData: number,
    loadingState: boolean,
    chartViewState: boolean,
    submitState: boolean,
    chartSpendList: number[],
    currentMonthSpend: number,
}

interface budgetInfo {
    incomeData: number,
    spendingData: number,
    savingsData: number,
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

export default class BudgetSetup extends React.Component<PropsInterface, MyState> {
    constructor(props: any) {
      super(props);

      this.state = {
        incomeData: 0,
        spendingData: 0,
        savingsData: 0,
        loadingState: true,
        chartViewState: false,
        submitState: false,
        currentMonthSpend: 0,
        chartSpendList: [0, 0, 0, 0, 0]
      }
      this.getTotalSpendings = this.getTotalSpendings.bind(this);
      this.calculateYearDate = this.calculateYearDate.bind(this);
      this.getBudgetInfo = this.getBudgetInfo.bind(this);
      this.buttonHandler = this.buttonHandler.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.setBudgetInfo = this.setBudgetInfo.bind(this);
      this.getTransactions = this.getTransactions.bind(this);
    }
    
    getTotalSpendings = httpsCallable(functions, 'getTotalSpendings');
    updateBudget = httpsCallable(functions, 'updateBudget');
    getTransactions = httpsCallable(functions, 'getTransactions');

    calculateYearDate(){
        var today = new Date();
        var oneYearBeforeToday = new Date();
        oneYearBeforeToday.setFullYear(oneYearBeforeToday.getFullYear()-1);
        var end_date = today.toISOString().slice(0, 10);
        var start_date = oneYearBeforeToday.toISOString().slice(0, 10)
        let date_object = {
            start_date: start_date,
            end_date: end_date
        }
        return date_object;
    }

    async loadTransactions(date : dateObject) {
        console.log("load Transactions");
        let transactions = await this.getTransactions({start_date: date.startDate, end_date: date.endDate}).then((result) => {
          let data : any = result.data;
          if(data){
            return data.transaction.ALL_TRANSACTIONS;
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

    async getBudgetInfo() : Promise<budgetInfo> {
        let yearDates = this.calculateYearDate();
        let budgetInfo = await this.getTotalSpendings({start_date: yearDates.start_date, end_date: yearDates.end_date}).then((result) => {
            let data : any = result.data;
            let incomeData = data.incomeData.INCOME.totalIncome;
            let spendingData = data.spendingData.TOTAL_CATEGORIES_SPENDING.spendingInfo.totalSpending;
            let budgetData : budgetInfo = {
                incomeData: parseInt((-1*incomeData/12).toFixed(2)),
                spendingData: parseInt((spendingData/12).toFixed(2)),
                savingsData: parseInt(((-1*incomeData/12)-(spendingData/12)).toFixed(2))
            }

            return budgetData;
        }).catch(ex => {
            console.error(ex);
            let budgetData : budgetInfo = {
                incomeData: 0,
                spendingData: 0,
                savingsData: 0,
            }
            return budgetData;
        })
        return new Promise((resolve) => {
            resolve(budgetInfo);
        })
    }

    async setBudgetInfo(budgetInfo: budgetInfo) : Promise<string> {
        let response = await this.updateBudget({incomeData: budgetInfo.incomeData, spendingData: budgetInfo.spendingData, savingsData: budgetInfo.savingsData})
            .then((result) => {
                return "SUCCESS";
            }).catch(ex => {
                console.error("budget set error:", ex);
                return "ERROR";
            })
            return new Promise((resolve) => {
                resolve(response);
            })
    }
    async componentDidMount() {
        const monthDates = this.calculateMonthDate(0);
        let monthlySpendList : any[]= [0, 0, 0 , 0, 0];
        let monthlyWeeklyDates = [];
        const firstDateOfMonth = new Date(monthDates.startDate);
        monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
        monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
        monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
        monthlyWeeklyDates.push(new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 7)));
        let loadedTransactions = await this.loadTransactions(monthDates);
        if (loadedTransactions as parsedTransaction[]) {
            let thisMonthSpend = 0;
            for(const transaction of loadedTransactions as parsedTransaction[]){
							if ((transaction.personalFinanceCategory.primary === "TRANSFER_IN" || transaction.personalFinanceCategory.primary === "TRANSFER_OUT"
							|| transaction.personalFinanceCategory.primary === "LOAN_PAYMENTS" || transaction.personalFinanceCategory.primary === "INCOME") 
							&& !(transaction.personalFinanceCategory.primary === "TRANSFER_OUT" && transaction.category!.includes('Third Party'))){
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
            }
            let todayDate = new Date();
						if (todayDate <= monthlyWeeklyDates[1]) {
							monthlySpendList[2] = null;
							monthlySpendList[3] = null;
							monthlySpendList[4] = null;
						} else {
							monthlySpendList[2] += monthlySpendList[1]
						} 
						if (todayDate <= monthlyWeeklyDates[2]) {
							monthlySpendList[3] = null;
							monthlySpendList[4] = null;
						} else {
							monthlySpendList[3] += monthlySpendList[2]
						} 
						if (todayDate <= monthlyWeeklyDates[3]) {
							monthlySpendList[4] = null;
						} else {
							monthlySpendList[4] += monthlySpendList[3]
						}
            this.setState(
              {
                currentMonthSpend: thisMonthSpend,
                chartSpendList: monthlySpendList
              }
            )
        }
        this.setState({
          incomeData: 0,
          spendingData: 0,
          savingsData: 0,
          loadingState: false,
        });
    }
    buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const button: HTMLButtonElement = event.currentTarget;
        if (button.name === "Next") {
            let budgetInfoInput: budgetInfo = {
                incomeData: this.state.incomeData,
                spendingData: this.state.spendingData,
                savingsData: this.state.savingsData,
            }
            if(budgetInfoInput.spendingData > budgetInfoInput.incomeData){
                alert("Input Error: Spending goal must be below your Income");
            } 
            else{
                this.setState ({submitState: true,})
                let response = await this.setBudgetInfo(budgetInfoInput);
                if (response === "SUCCESS") {
                    mixpanel.setIdentity().then(()=>{
                            mixpanel.trackEvent("Go To Last Frame!")
                    })
                    this.props.hideComponent("showHideFrame6");
                } else {
                    window.alert("ERROR SETTING YOUR BUDGET... PLEASE TRY AGAIN")
                }
			}
        } else if (button.name === "Previous") {
            mixpanel.setIdentity().then(()=>{
                mixpanel.trackEvent("Back to My Accounts!")
            })
            this.props.hideComponent("showHideMyAccounts");
        } else if(button.name ==="changeView"){
            this.setState({
                chartViewState: !this.state.chartViewState
            })
        }
    };

    onChangeHandler = (event: any) => {
        event.preventDefault();
        const slider = event.currentTarget;
				let value = parseFloat(slider.value);
        if (slider.id === "SpendingRange"){
						value = isNaN(value) ? 0 : value
						value = value < this.state.incomeData ? value : this.state.incomeData;
            this.setState({
                spendingData: value,
                savingsData: this.state.incomeData - value >= 0 ? Math.round(this.state.incomeData - value) : 0,
            })
        } else if(slider.id === "IncomeRange") {
            this.setState({
                incomeData: value,
                savingsData: value - this.state.spendingData >= 0 ? Math.round(value - this.state.spendingData) : 0 ,
            })

        } else if(slider.id ==="SavingRange"){
					const income = this.state.incomeData;
            this.setState({
                spendingData: income - value >= 0 ? Math.round(income - value) : 0,
                savingsData: value,
            })
        } 
    }
    render() {
        return(
            <div>
                <BudgetNavBar></BudgetNavBar>
                <Container fluid align-content= "center" px-4>
                    <Alert key={'warning'} variant={'warning'}>
                        <b> Notice: </b> We are continually improving this process. Numbers shown may look off depending on the accounts added. Please adjust according!
                    </Alert>
                    <Container fluid align-content= "center">
                        <Row className="justify-content-md-center flex-nowrap">
                        <Col md ="auto" justify-content-left style ={{top:"50px"}}>
                        <div className='SecondaryHeader' style={{width: "600px", minWidth: "600px"}}>
                            For now, our main feature is displaying this graph as you browse, in addition to the dashboard. We'll be shortly implementing 'Savings Goals' (We'll help you track your savings to reach your financial aspirations!) Stay tuned!
                        </div>
                            <div style={{paddingTop: "25px"}}>
                                <Line
                                    height= {"200px"}
                                    options={
                                        {
                                          responsive: true,
                                          plugins: {
                                            legend: {
                                                display: true,
                                                position: 'bottom' as const,
                                                align: 'start',
                                                labels: {
                                                  boxHeight: 2,
                                                  boxWidth: 15,
                                                  pointStyle: 'line'
                                                }
                                            },
                                            title: {
                                                display: false,
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
                                              suggestedMin: 0,
                                              grid: {
                                                display: false
                                              },
                                              ticks: {
                                                count: 3,
                                                // Include a dollar sign in the ticks
                                                callback: function(value, index, ticks) {
                                                  return '$' + value;
                                                }
                                              },
                                              max: this.state.incomeData > Math.max(...this.state.chartSpendList)
                                                    ? (Math.floor((this.state.incomeData/ 500)) + 1) * 500
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
                                            label: 'Your Current Month Spending',
                                            data: this.state.chartSpendList,
                                            borderColor: 'rgb(75, 192, 192)',
                                            backgroundColor: 'rgb(75, 192, 192)',
                                            pointHoverBorderColor: 'rgb(75, 192, 192)',
                                            tension: 0.4
                                        },
                                        {
                                            label: 'Monthly Spend Target',
                                            data: [this.state.spendingData, this.state.spendingData, this.state.spendingData, this.state.spendingData, this.state.spendingData],
                                            borderColor: 'rgb(45, 58, 111)',
                                            backgroundColor: 'rgb(45, 58, 111)',
                                            pointHoverBorderColor: 'rgb(45, 58, 111)',
                                            borderDash: [10,10],
                                            tension: 0.4
                                        },
                                        {
                                            label: 'Monthly Income',
                                            data: [this.state.incomeData, this.state.incomeData, this.state.incomeData, this.state.incomeData, this.state.incomeData],
                                            borderColor: 'rgb(164, 172, 204)',
                                            backgroundColor: 'rgb(164, 172, 204)',
                                            pointHoverBorderColor: 'rgb(164, 172, 204)',
                                            tension: 0.4
                                        },
                                        ],
                                    }}>
                                </Line>
                            </div>
                        </Col >
                        <Col md ="auto">
                        </Col>
                        <Col className = "mainContainerFrame2" md ="4" style ={{top:"50px", minWidth: "400px", height: "500px"}}> 
                            <Container fluid="md">
                                <Row >
                                    <div className="circle" ></div>
                                    <div className="circle" style = {{background: '#2D3A6F',left: "10px"}} ></div>
                                    <div className="circle" style = {{left: "20px"}} ></div>
                                    <div className="circle" style = {{left: "30px"}} ></div>
                                </Row>
                                <Row>
                                    <div className='BoldHeader'>
                                        You’re almost done! Let’s set a a savings goal.
                                    </div>
                                    <div className='SecondaryHeaderBudgetSetup'>
                                        <b>Thank you for connecting to Plaid.</b> We've calculated your average monthly spending and income to autopopulate the fields below. <b>Please adjust as necessary.  </b>
                                          Note: Try to keep your spend goal above your current spend!
                                    </div>
                                </Row>
                                <Row style={{paddingTop: "15px"}}>
                                    <Col>
                                        <label htmlFor="customRange1" className="sliderLabel">Monthly Income</label>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control id="IncomeRange" onChange={this.onChangeHandler} className='sliderBoxFont' type="number" defaultValue="3000" value={(this.state.incomeData).toString()}/>
                                            </Form.Group>
                                        </Form>							
                                    </Col>                     
                                </Row>
                                <Row style={{paddingTop: "5px"}}>
                                    <Col>
                                        <label htmlFor="customRange1" className="sliderLabel">Monthly Spend Target</label> <br></br>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control id="SpendingRange" onChange={this.onChangeHandler} className='sliderBoxFont' defaultValue="1000" type="number" value={(this.state.spendingData).toString()}/>
                                            </Form.Group>
                                        </Form>																		
                                    </Col>    
                                </Row>                                
                                <Row style={{paddingTop: "5px"}}>
                                    <Col>
                                        <label htmlFor="customRange1" className="sliderLabel">Monthly Saving Goal</label> <br></br>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control id="SavingRange" onChange={this.onChangeHandler} className='sliderBoxFont' type="number" value={(this.state.savingsData).toString()}/>
                                            </Form.Group>
                                        </Form>
                                    </Col>	
                                </Row>                                
                                <Row >
                                    <button name="Next" onClick={this.buttonHandler} style={{}}>
                                        <div className='button-text'>Set Budget</div>
                                    </button>
                                    
                                    <div>
                                        {this.state.submitState ? 
                                            <Popover id="popover-basic">
                                                <Popover.Header as="h3">Securely storing your budget!</Popover.Header>
                                                <Popover.Body>
                                                    Please wait shortly...
                                                    <Spinner animation="grow" size="sm" variant="primary"/>
                                                    <Spinner animation="grow" size="sm" variant="primary"/>
                                                    <Spinner animation="grow" size="sm" variant="primary"/>
                                                </Popover.Body>
                                            </Popover> :
                                            <></>
                                        }
                                    </div>
                                </Row>
                                <Row className = "mainContainerImgFrame2 flex-nowrap" style ={{marginTop:"5px"}}>
                                    <Col lg={11} md={11} sm={11} xs={11}></Col>
                                    <Col lg={1} md={1} sm={1} xs={1}>
                                        <img className = "okaneIcon" src="images/okane_logo.png"></img>
                                    </Col>
                                </Row> 
                            </Container>     
                        </Col>
                    </Row>
                </Container>
                </Container>
            </div>
        )
    }
}

