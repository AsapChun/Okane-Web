import { Card, Row, Col} from "react-bootstrap"
import { useEffect, useState } from 'react';
import { defaults } from 'chart.js';
import './SpendingChart.css';
import * as d3 from "d3";

// D3 Shenanigans
interface IDonutChartProps {
  dimensionWidth: number;
  dimensionHeight: number;
  avgNonEssentialSpending: number;
  totalMonthNonEssentialSpend: number;
  topFiveDiscretionaryCategories: any[];
  clickedCategory: string;
}

const SampleDonutChart = (props: IDonutChartProps) => {
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
      .attr('width', props.dimensionWidth)
      .attr('height', props.dimensionHeight)
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
      for(let i = dataInput.length - 1; i >= 0; i--){
        if(dataInput[i].value == 0){
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
      padding: "0px"
    }}>
    </div>
  )
}

export default SampleDonutChart