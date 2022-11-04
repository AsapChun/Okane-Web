import { useState } from "react";
import { Card, Col} from "react-bootstrap"
import './EssentialCategories.css';


// D3 Shenanigans
interface PropsInterface {
    spendingData: any;  
    spendingDataLoaded: boolean;
}


const EssentialCategories: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  const [essentialInfo, changeEssentialInfo] = useState("essentialLeadClosed")
  // Edit with right data
  let topFiveEssentialCategories: any[] = [];
  let totalEssentialSpend = 0;
  let averageEssentialSpend = 0;
  if(props.spendingData != undefined){
    props.spendingData.topFiveEssentialSpending.forEach((spendInfo : any) => {
      totalEssentialSpend += Math.abs(spendInfo.data.currentMonthSpend);
      averageEssentialSpend += Math.abs(spendInfo.data.avgSpending);
    })
    if(props.spendingData.topFiveEssentialSpending.length === 0){
      topFiveEssentialCategories.push(
        {
          category: 'No essential spending this month',
          data: {
            currentMonthSpend: 'Try adding additional accounts to see all your financials here'
          }
        }
      )
    } else if(topFiveEssentialCategories.length <= 5) {
      /*
      topFiveEssentialCategories.push(
        {
          category: 'Other',
          data: {
            // Update when endpoint updated
            currentMonthSpend: props.spendingData.avgNonEssentialSpending - props.spendingData.totalMonthNonEssentialSpend
          }
        }
      )
      */
    }
  }

  const infoHandlerOut = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    changeEssentialInfo("essentialLeadClosed");
  };

  const infoHandlerOver = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    changeEssentialInfo("essentialLeadOpen");
  };

  return(
    <>
      <div style = {{width: "100%"}}>
      {(props.spendingDataLoaded) ?
        <Card className="border-0" style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "10px"
        }}>
          <Card.Header>
            <Card.Title style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "25px",
            }}>
              Essential spending categories
              <img className = "infoIcon" onMouseOut={(e) => infoHandlerOut(e)} onMouseOver={(e) => infoHandlerOver(e)} src={window.location.origin + "/images/Info Icon.png"}></img>
              <div className={essentialInfo} >
                  Breakdown of your essential spending <br></br>(this spending is not included in your spending chart)
                  <br></br>
                  <br></br>
                  To see more details / change transaction categories, go to the 'Transactions' tab
              </div>
            </Card.Title>
              <div style={{
                fontFamily:"Poppins, sans-serif",
                fontSize: "20px",
                textAlign: "left"
              }}>
                {props.spendingData.topFiveEssentialSpending.length <=0 ?
                  <>
                    Hi there! We are unable to detect any Essential Spend over the past month! 
                  </>
                : 
                  <>
                    You have <text className="underLineText">${Math.round(totalEssentialSpend)} in essential spend this month</text>
                  </>  
                }
              </div>
          </Card.Header>
          <Card.Body style={{
            display: "flex",
            padding: "0px"
          }}>
            <Col style={{
              padding: "0px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "safe center",
              height: "100%",
              width: "100%",
              paddingTop: "30px"
            }}>
              {props.spendingData.topFiveEssentialSpending.sort(function(a: any, b: any){
                return Math.abs(b.data.currentMonthSpend) - Math.abs(a.data.currentMonthSpend)
              }).map((spendObject: any) => 
                <div className = "essentialCategoryDashboard">
                  <div>
                      <img className= "imagesIconsDashboardEssential" src= {window.location.origin + "/images/Icons/" + spendObject.category + ".png"}></img>
                  </div>
                  <div className = "discretionaryCategoryLabel">
                    {spendObject.category}
                  </div>
                  <div className = "discretionaryCategoryAmount">
                      (${Math.abs(Math.round(spendObject.data.currentMonthSpend))})
                  </div>
                </div>
              )}
            </Col>  
          </Card.Body>
        </Card>
      : 
      <Card className="border-0" style={{
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px"
      }}>
        <Card.Header>
          <Card.Title style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "25px",
          }}>
            Essential spending overview (Demo Data)
            <img className = "infoIcon" onMouseOut={(e) => infoHandlerOut(e)} onMouseOver={(e) => infoHandlerOver(e)} src={window.location.origin + "/images/Info Icon.png"}></img>
            <div className={essentialInfo}>
                Breakdown of your essential spending <br></br>(this spending is not included in your spending chart)
                <br></br>
                <br></br>
                To see more details / change transaction categories, go to the 'Transactions' tab
            </div>
          </Card.Title>
          {/* <div style={{
              fontFamily:"Poppins, sans-serif",
              fontSize: "20px",
              textAlign: "left"
            }}>
              Hi there! You have <text className="underLineText">spent $400 in Essential spend this month,</text> 
              &nbsp;compared to your monthly average ($552)
          </div> */}
        </Card.Header>
        <Card.Body>
          <Col style={{
                padding: "0px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "safe center",
                height: "100%",
                width: "100%",
                paddingTop: "30px"
              }}>
          <div className = "essentialCategoryDashboard">
            <div>
                <img className= "imagesIconsDashboard" src= {window.location.origin + "/images/Icons/Transfer.png"}></img>
            </div>
            <div className = "discretionaryCategoryLabel">
              Transfer
            </div>
            <div className = "discretionaryCategoryAmount">
                ${Math.round(300)}
            </div>
          </div>
          <div className = "essentialCategoryDashboard">
            <div>
                <img className= "imagesIconsDashboard" src= {window.location.origin + "/images/Icons/Fees & Charges.png"}></img>
            </div>
            <div className = "discretionaryCategoryLabel">
              Fees and Charges
            </div>
            <div className = "discretionaryCategoryAmount">
                ${Math.round(150)}
            </div>
          </div>
          <div className = "essentialCategoryDashboard">
            <div>
                <img className= "imagesIconsDashboard" src= {window.location.origin + "/images/Icons/Loans.png"}></img>
            </div>
            <div className = "discretionaryCategoryLabel">
              Loans
            </div>
            <div className = "discretionaryCategoryAmount">
                ${Math.round(100)}
            </div>
          </div>
          </Col> 
        </Card.Body>
      </Card>}
    </div>  
    </>
  )
}

export default EssentialCategories