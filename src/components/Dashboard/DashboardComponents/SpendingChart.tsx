import { Card, Col} from "react-bootstrap"
import { useEffect, useState } from 'react';
import { defaults } from 'chart.js';
import './SpendingChart.css';
import * as d3 from "d3";
import SampleDonutChart from "./SampleDonutChart";


// D3 Shenanigans
interface IDonutChartProps {
  dimensionWidth: number;
  dimensionHeight: number;
  avgNonEssentialSpending: number;
  totalMonthNonEssentialSpend: number;
  topFiveDiscretionaryCategories: any[];
  clickedCategory: string;
}

const DonutChart = (props: IDonutChartProps ) => {
  let arc = d3.arc<any>()
                .outerRadius(props.dimensionHeight * 0.48)
                .innerRadius(props.dimensionHeight * 0.38); // inner arc for the doughnut hole

  let arcAnimate = d3.arc<any>()
    .outerRadius(props.dimensionHeight * 0.50)
    .innerRadius(props.dimensionHeight * 0.36); // inner arc for the doughnut hole

  useEffect(() => {
    if(props.clickedCategory !== ""){
      d3.selectAll(".slices_in")
        .transition()
        .duration(300)
        .attr("d", arc)

      let clickedCategorySelector = "." + props.clickedCategory.replace(/ /g, "_")
      d3.select(clickedCategorySelector)
        .transition()
        .duration(300)
        .attr("d", arcAnimate)
    } 
  }, [props.clickedCategory])

  // create a list of keys
  let keys : string[] = []
  keys = [(props.topFiveDiscretionaryCategories[0].category), 
              (props.topFiveDiscretionaryCategories[1].category), 
              (props.topFiveDiscretionaryCategories[2].category),
              (props.topFiveDiscretionaryCategories[3].category),
              (props.topFiveDiscretionaryCategories[4].category),
              "Other",
            ]; 
  type Data = { label: string; value: number; }; // shape of your data
  let top_spend_data: Data = { label: keys[0], value: props.topFiveDiscretionaryCategories[0].data.currentMonthSpend }
  let second_spend_data: Data  = { label: keys[1], value: props.topFiveDiscretionaryCategories[1].data.currentMonthSpend }
  let third_spend_data: Data = { label: keys[2], value: props.topFiveDiscretionaryCategories[2].data.currentMonthSpend }
  let fouth_spend_data: Data = { label: keys[3], value: props.topFiveDiscretionaryCategories[3].data.currentMonthSpend }
  let fifth_spend_data: Data = { label: keys[4], value: props.topFiveDiscretionaryCategories[4].data.currentMonthSpend }
  let other_spend_data: Data = { label: keys[5], value: (props.totalMonthNonEssentialSpend
                                                          - props.topFiveDiscretionaryCategories[0].data.currentMonthSpend
                                                          - props.topFiveDiscretionaryCategories[1].data.currentMonthSpend
                                                          - props.topFiveDiscretionaryCategories[2].data.currentMonthSpend
                                                          - props.topFiveDiscretionaryCategories[3].data.currentMonthSpend
                                                          - props.topFiveDiscretionaryCategories[4].data.currentMonthSpend) }
  let remaining_spend_data: Data = { label: "Remaining Spend", value: props.avgNonEssentialSpending - props.totalMonthNonEssentialSpend >= 0 ? 
    Math.round((props.avgNonEssentialSpending - props.totalMonthNonEssentialSpend) * 100) / 100 : 0}
  


  let total = ["$" + props.totalMonthNonEssentialSpend.toFixed(0)]
  let totalNumber = ((props.totalMonthNonEssentialSpend*100)/100)
  let xPositioningLead = 470
  if (totalNumber < 100){
		xPositioningLead = 488;
	} else if (totalNumber > 99 && totalNumber < 1000) {
		xPositioningLead = 480;
	} else if (totalNumber > 999 && totalNumber < 10000) {
		xPositioningLead = 460;
	} else if (totalNumber > 9999) {
		xPositioningLead = 0;
	}
  
  let color = d3.scaleOrdinal()
    .domain(keys
            // "Remaining spend"
          )
    .range(["#2D3A6F","#475CAE","#6073BE","#8B99D0", "#B7BFE1", "#CFD8DC", "#DCEDC8"]);

    // Handle case where there is no spend this month
    if(props.totalMonthNonEssentialSpend === 0){
      keys = ["Remaining budget"]
      color = d3.scaleOrdinal()
        .domain(["Remaining budget"])
        .range(["#CFD8DC"]);
      total = ["$" + props.avgNonEssentialSpending.toFixed(0)]
      totalNumber = ((props.avgNonEssentialSpending*100)/100)
    }

  function buildGraph(data: Array<Data>) {
    
    let pie = d3.pie<Data>()
    .sort(null) // Sort the data input before passing to pie
    .value(d => d.value > 0 ? d.value : 0); 
    
    d3.select('#bounds')
      .append('svg')
      .attr('class', 'svgMap')
      .attr('viewBox', `0 0 ` + props.dimensionWidth + ` ` + props.dimensionHeight)
      .append('g')
      .attr("class", "slices")
        .selectAll<SVGSVGElement, Data>(".slices_in")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("class", function(d){
          return d.data.label.replace(/ /g, "_") + " slices_in"
        })
        .style("fill", function(d) { 
          return color(d.data.label) as string })
        .attr("d", arc)
        .style("stroke-linecap", "round")
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .attr('transform', `translate(${ 175 },${ 175 })`)

    /* Uncomment if graph hover functionality needed
    d3.selectAll(".slices_in")
        .on('mouseover', function() {
          d3.select(this)
          .transition()
          .duration(300)
          .attr("d", arcAnimate)
        })
        .on('mouseout', function(d) {
          d3.select(this)
          .transition()
          .duration(300)
          .attr("d", arc)
        })
    */
    
    d3.select('.svgMap')
      .selectAll("legend")
      .data(total)
      .enter()
      .append("text")
      .text(function(d) { return d; })
      .attr("text-anchor", "middle")
      .style("font-size", "55px")
      .style("font-family", "Poppins")
      .style("alignment-baseline", "middle")
      .style("font-weight", "600")
      .attr('transform', `translate(${ 175 },${ 175 })`)
    
    let centerLabel = ""
    let xPositionLabel = "0"
    if(props.totalMonthNonEssentialSpend === 0){
      centerLabel = "avg. spend"
      xPositionLabel = "485"
    } else {
      centerLabel = "current spend"
      xPositionLabel = "470"
    }
    d3.select('.svgMap')
      .selectAll("legendSub")
      .data([centerLabel])
      .enter()
      .append("text")
      .text(function(d) { return d; })
      .attr("text-anchor", "middle")
      .style("font-size", "25px")
      .style("font-family", "Poppins")
      .style("alignment-baseline", "middle")
      .style("font-weight", "400")
      .style("color", "#E5E4E2")
      .attr('transform', `translate(${ 175 },${ 215 })`)
    
    /*
      d3.select('.svgMap')
      .append("svg:image")
        .attr('height', 25)
        .attr('width', 25)
        .attr("xlink:href", window.location.origin + "/images/Info Icon.png")
        */
     
  }

  function buildLegend (data: Array<Data>) {
    let topAgenda = []
    
    if(props.totalMonthNonEssentialSpend == 0){
      topAgenda = [
        // "Remaining spend ($" + data[4].value + ")",
       "$0 in spend this month!"]
    } else {
      let totalSpend = 0;
      for(let k = 0; k < data.length; k++){
        totalSpend += data[k].value;
      }
      topAgenda = [
        // "Remaining spend ($" + data[4].value + ")",
       "This month's spend ($" + totalSpend.toFixed(0) + ")"]
    }

  }

  useEffect(() => {
    let dataInput = [];
    if(props.totalMonthNonEssentialSpend === 0){
      let input_data: Data  = { label: keys[0], value: props.avgNonEssentialSpending }
      dataInput.push(input_data)
    } else {
      dataInput.push(top_spend_data)
      dataInput.push(second_spend_data)
      dataInput.push(third_spend_data)
      dataInput.push(fouth_spend_data)
      dataInput.push(fifth_spend_data)
      dataInput.push(other_spend_data)
      if(props.totalMonthNonEssentialSpend < props.avgNonEssentialSpending){
        dataInput.push(remaining_spend_data)
      }
      
      let lastIndex = dataInput.length
      // Cleanse data to not show 0
      for(let i = dataInput.length - 1; i >= 0; i--){
        if(dataInput[i].value === 0){
          lastIndex = i;
        }
      }
      for(let j = dataInput.length - 1; j >= lastIndex; j--){
        dataInput.pop();
      }
  
    }
    buildGraph(dataInput);
    //buildLegend(dataInput);
  }, [])

  return(
    <div id="bounds" style={{
      height: "450px",
      padding: "0px",
      width: "350px"
    }}>
    </div>
  )
}

defaults.font.family = 'Poppins';
defaults.borderColor = '#655B96'



interface PropsInterface  {
  plaidLinked: string,
  spendingData: any,
  spendingDataLoaded: boolean,
}

const SpendingChart: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  
  let discretionaryCategoriesCleaned : any[]= [];
  let colorArray = ["#2D3A6F","#475CAE","#6073BE","#8B99D0", "#B7BFE1", "#CFD8DC", "#DEDFE6"];

  if(props.spendingData !== undefined){
    let indexMonthSpendZero = props.spendingData.topFiveDiscretionaryCategories.length
    // Find index value where currentMonthSpend equals 0
    for(let i = props.spendingData.topFiveDiscretionaryCategories.length - 1; i >= 0; i--){
      if(props.spendingData.topFiveDiscretionaryCategories[i].data.currentMonthSpend === 0){
        indexMonthSpendZero = i;
      }
    }
    let spendAmongCategories = 0;
    // Add Categories not in equal to 0 to discretionaryCategoriesCleaned
    for(let i = 0; i < indexMonthSpendZero; i++){
      spendAmongCategories += props.spendingData.topFiveDiscretionaryCategories[i].data.currentMonthSpend;
      discretionaryCategoriesCleaned.push(props.spendingData.topFiveDiscretionaryCategories[i]);
    }
    if(discretionaryCategoriesCleaned.length === 0){
      discretionaryCategoriesCleaned.push(
        {
          category: 'Remaining Budget',
          data: {
            currentMonthSpend: props.spendingData.avgNonEssentialSpending
          }
        }
      )
    } else if(discretionaryCategoriesCleaned.length <= 5) {
      discretionaryCategoriesCleaned.push(
        {
          category: 'Other',
          data: {
            currentMonthSpend: props.spendingData.totalMonthNonEssentialSpend  -spendAmongCategories
          }
        }
      )
    }
    for(let x = 0; x < discretionaryCategoriesCleaned.length; x++){
      discretionaryCategoriesCleaned[x].color = colorArray[x]
    }
  }

  const [categoryClicked, changeCategoryClicked] = useState("");
  const [leadInfoOpen, changeLeadInfo] = useState("infoLeadClosed")
  const [chartInfoOpen, changeChartInfo] = useState("infoChartClosed")


  const buttonHandlerEssential = (e: React.MouseEvent<HTMLButtonElement>, categoryClickedName: string) => {
    e.preventDefault();
    changeCategoryClicked(categoryClickedName);
  };

  const infoHandlerOut = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    changeLeadInfo("infoLeadClosed");
  };

  const infoHandlerOver = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    changeLeadInfo("infoLeadOpen");
  };

  const infoChartHandlerOut = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    changeChartInfo("infoChartClosed");
  };

  const infoChartHandlerOver = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    changeChartInfo("infoChartOpen");
  };

 const sampleCategoryData = [
  {
    category: "Eating Out",
    color: "#2D3A6F",
    data: {
      avgSpending: 1000,
      currentMonthSpend:200
    }
  },
  {
    category: "Entertainment",
    color:"#475CAE",
    data: {
      avgSpending: 600,
      currentMonthSpend: 75
    }
  },
  {
    color: "#6073BE",
    category: "Personal Care",
    data: {
      avgSpending: 300,
      currentMonthSpend: 30
    }
  },
  {
    color: "#8B99D0",
    category: "General Expenses",
    data: {
      avgSpending: 300,
      currentMonthSpend: 28
    }
  },
  {
    color:"#B7BFE1",
    category: "Shopping",
    data: {
      avgSpending: 100,
      currentMonthSpend: 12
    }
  },
  {
    color:"#B7BFE1",
    category: "Other",
    data: {
      avgSpending: 100,
      currentMonthSpend: 55
    }
  },
]
  
  return(
    <div style = {{width: "100%"}}>
      {(props.spendingDataLoaded) && props.spendingData.topFiveDiscretionaryCategories.length > 0 && discretionaryCategoriesCleaned.length > 0 ?
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
              Non-essential spending overview
              <img className = "infoIcon" onMouseOut={(e) => infoHandlerOut(e)} onMouseOver={(e) => infoHandlerOver(e)} src={window.location.origin + "/images/Info Icon.png"}></img>
              <div className={leadInfoOpen}>
                  Breakdown of controllable, non-essential spending <br></br>(it's likely easier to control eating out spend vs changing rent)
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
                Hi there! You have <text className="underLineText">spent ${props.spendingData.totalMonthNonEssentialSpend.toFixed(0)} in non-essential spend this month, </text> 
                compared to your <b>monthly average (${props.spendingData.avgNonEssentialSpending.toFixed(0)})</b>
            </div>
          </Card.Header>
          <Card.Body style={{
            display: "flex"
          }}>
            <Col style={{
              width: "375px",
              flexGrow: "0"
            }}>
              <img className = "infoIcon" onMouseOut={(e) => infoChartHandlerOut(e)} onMouseOver={(e) => infoChartHandlerOver(e)} src={window.location.origin + "/images/Info Icon.png"}></img>
              <div className={chartInfoOpen}>
                {(props.spendingData.avgNonEssentialSpending - props.spendingData.totalMonthNonEssentialSpend > 0 ?
                  "Your default spending budget is calculated using the average spending the last 12 months" :
                  "Your default spending budget is calculated using the average spending the last 12 months" )}
              </div>
              <DonutChart dimensionWidth={400} dimensionHeight={350} 
                  avgNonEssentialSpending={props.spendingData.avgNonEssentialSpending}
                  totalMonthNonEssentialSpend={props.spendingData.totalMonthNonEssentialSpend}
                  topFiveDiscretionaryCategories={props.spendingData.topFiveDiscretionaryCategories}
                  clickedCategory={categoryClicked}
              ></DonutChart>
            </Col>
            <Col style={{
              paddingLeft: "10px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "safe center",
              height: "100%"
            }}>
              {discretionaryCategoriesCleaned.map((data: any) => 
                <div className = "discretionaryCategoryDashboard">
                  <div>
                    <button onMouseOver={(e) => buttonHandlerEssential(e, data.category)} className = "invisibleButtonIconDashboard">
                      <img className= {` ${categoryClicked === data.category ? "imagesIconsDashboardClicked imagesIconsDashboard" : "imagesIconsDashboard"} `} src= {window.location.origin + "/images/Icons/" + data.category + ".png"} alt="" style = {{
                        borderColor: data.color
                      }}></img>
                    </button>
                  </div>
                  <div className = "discretionaryCategoryLabel">
                    {data.category}
                  </div>
                  <div className = "discretionaryCategoryAmount">
                    (${Math.round(data.data.currentMonthSpend)})
                  </div>
                </div>
              )}
                {(props.spendingData.avgNonEssentialSpending - props.spendingData.totalMonthNonEssentialSpend) > 0 ?
                  <div className = "discretionaryCategoryDashboard" style={{width: "250px", marginBottom: "50px"}}>
                    <div>
                      <button onMouseOver={(e) => buttonHandlerEssential(e, "Remaining Spend")} className = "invisibleButtonIconDashboard">
                        <img className= {` ${categoryClicked === "X" ? "imagesIconsDashboardClicked imagesIconsDashboard" : "imagesIconsDashboard"} `} src= {window.location.origin + "/images/Icons/Remaining Budget.png"} alt="" style = {{
                          borderColor: "#DCEDC8"
                        }}></img>
                      </button>
                    </div>
                    <div className = "discretionaryCategoryLabel" style ={{marginBottom: "50px"}}>
                      Remaining Budget: (${(props.spendingData.avgNonEssentialSpending - props.spendingData.totalMonthNonEssentialSpend).toFixed(0)})
                    </div>
                  </div>
                :
                  <>
                  </>
                }
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
            Non-essential spending overview
              <img className = "infoIcon" onMouseOut={(e) => infoHandlerOut(e)} onMouseOver={(e) => infoHandlerOver(e)} src={window.location.origin + "/images/Info Icon.png"}></img>
            <div className={leadInfoOpen}>
                Breakdown of controllable, non-essential spending <br></br>(it's likely easier to control eating out spend vs changing rent)
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
              Hi there! You have <text className="underLineText">spent $400 in non-essential spend this month, </text> 
              compared to your monthly average $552
          </div>
        </Card.Header>
        <Card.Body style={{
          display: "flex"
        }}>
          <Col style={{
            width: "375px",
            flexGrow: "0"
          }}>
            <img className = "infoIcon" onMouseOut={(e) => infoChartHandlerOut(e)} onMouseOver={(e) => infoChartHandlerOver(e)} src={window.location.origin + "/images/Info Icon.png"}></img>
            <div className={chartInfoOpen}>
              {552 - 400 > 0 ?
                "Your non-essential spend this month against your calculated monthly average over the past 12 months" :
                "Your non-essential spend (currently higher than your monthly average)"}
            </div>
            <SampleDonutChart dimensionWidth={400} dimensionHeight={350} 
                avgNonEssentialSpending={552}
                totalMonthNonEssentialSpend={400}
                topFiveDiscretionaryCategories={sampleCategoryData}
                clickedCategory={categoryClicked}
            ></SampleDonutChart>
          </Col>
          <Col style={{
            paddingLeft: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "safe center",
            height: "100%"
          }}>
            {sampleCategoryData.map((data: any) => 
              <div className = "discretionaryCategoryDashboard">
                <div>
                  <button onMouseOver={(e) => buttonHandlerEssential(e, data.category)} className = "invisibleButtonIconDashboard">
                    <img className= {` ${categoryClicked === data.category ? "imagesIconsDashboardClicked imagesIconsDashboard" : "imagesIconsDashboard"} `} src= {window.location.origin + "/images/Icons/" + data.category + ".png"} style = {{
                      borderColor: data.color
                    }}></img>
                  </button>
                </div>
                <div className = "discretionaryCategoryLabel">
                  {data.category}
                </div>
                <div className = "discretionaryCategoryAmount">
                  (${Math.round(data.data.currentMonthSpend)})
                </div>
              </div>
            )}
            <div className = "discretionaryCategoryDashboard" style={{width: "250px", marginBottom: "50px"}}>
              <div>
                <button onMouseOver={(e) => buttonHandlerEssential(e, "Remaining Spend")} className = "invisibleButtonIconDashboard">
                  <img className= {` ${categoryClicked === "X" ? "imagesIconsDashboardClicked imagesIconsDashboard" : "imagesIconsDashboard"} `} src= {window.location.origin + "/images/Icons/Remaining Budget.png"} alt="" style = {{
                    borderColor: "#DCEDC8"
                  }}></img>
                </button>
              </div>
              <div className = "discretionaryCategoryLabel" style ={{marginBottom: "50px"}}>
                Remaining Budget: $152
              </div>
            </div>
          </Col>  
        </Card.Body>
      </Card>}
    </div>  
  )

}

export default SpendingChart