import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { monthNames, monthNamesAbbr, destinationsInfo } from './data';

// --- Helper functions ---
const getMonthSeasonType = (destination, monthIndex) => {
  if (!destination || !destination.periods) return 'off';
  for (const period of destination.periods) {
    if (period.months.includes(monthIndex)) return period.type;
  }
  return 'off';
};

const getMonthSwellInfo = (destination, monthIndex) => {
  if (destination && destination.swellData && destination.swellData[monthIndex]) {
    return destination.swellData[monthIndex];
  }
  return "N/A";
};

const getSeasonColors = () => ({
  high: '#10B981', shoulder: '#F59E0B', off: '#9CA3AF',
  textDefault: '#1F2937', textLight: '#FFFFFF', mapLand: '#E5E7EB', mapBorder: '#9CA3AF', mapMarker: '#EF4444' 
});

const toSafeClassName = (name) => name.replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const getEarliestShoulderMonth = (destination) => {
  let earliestMonth = 12;
  if (destination && destination.periods) {
    for (const period of destination.periods) {
      if (period.type === 'shoulder' && period.months && period.months.length > 0) {
        const minMonthInPeriod = Math.min(...period.months);
        if (minMonthInPeriod < earliestMonth) earliestMonth = minMonthInPeriod;
      }
    }
  }
  return earliestMonth;
};

// --- D3TimelineChart Component ---
const D3TimelineChart = ({ destinations = destinationsInfo }) => {
  const d3Container = useRef(null);
  
  const sortedDestinations = [...destinations].sort((a, b) => {
    const earliestShoulderA = getEarliestShoulderMonth(a);
    const earliestShoulderB = getEarliestShoulderMonth(b);
    if (earliestShoulderA !== earliestShoulderB) return earliestShoulderA - earliestShoulderB;
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    if (sortedDestinations && sortedDestinations.length > 0 && d3Container.current) {
      const container = d3.select(d3Container.current);
      container.selectAll("*").remove();

      const margin = { top: 50, right: 30, bottom: 50, left: 250 }; 
      const cellHeight = 30;
      const cellPadding = 2;
      const legendRectSize = 18;
      const legendSpacing = 4;
      
      const chartHeight = sortedDestinations.length * (cellHeight + cellPadding);
      const timelineContainerWidth = d3Container.current.clientWidth || 800;
      const width = Math.min(timelineContainerWidth - margin.left - margin.right, 700);
      const height = chartHeight; 

      const svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 50) 
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const colors = getSeasonColors();
      const xScale = d3.scaleBand().domain(monthNamesAbbr).range([0, width]).padding(0.05);
      const yScale = d3.scaleBand().domain(sortedDestinations.map(d => d.name)).range([0, height]).paddingInner(cellPadding / cellHeight).paddingOuter(0.1);

      const xAxis = d3.axisTop(xScale).tickSize(0);
      svg.append("g").attr("class", "x-axis").call(xAxis).selectAll("text").style("text-anchor", "middle").attr("fill", colors.textDefault);
      svg.select(".x-axis path").remove(); 

      const yAxis = d3.axisLeft(yScale).tickSize(0);
      svg.append("g").attr("class", "y-axis").call(yAxis).selectAll("text")
          .attr("fill", colors.textDefault).style("font-size", "11px") 
          .each(function(d) { 
            const self = d3.select(this);
            const country = sortedDestinations.find(dest => dest.name === d)?.country;
            if (country) {
                self.text(null); 
                self.append("tspan").attr("x", -5).attr("dy", "-0.2em").text(d);
                self.append("tspan").attr("x", -5).attr("dy", "1.2em").style("font-size", "9px").style("fill", "#6B7280").text(country);
            }
          });
      svg.select(".y-axis path").remove(); 

      const timelineTooltip = d3.select(d3Container.current) 
        .append("div")
        .attr("class", "d3-tooltip timeline-tooltip") 
        .style("opacity", 0) 
        .style("position", "absolute") 
        .style("pointer-events", "none"); 

      sortedDestinations.forEach(dest => {
        const safeDestClassName = toSafeClassName(dest.name); 
        svg.selectAll(`.cell-${safeDestClassName}`).data(monthNamesAbbr).enter().append("rect")
          .attr("class", `cell cell-${safeDestClassName}`)
          .attr("x", d_month => xScale(d_month)).attr("y", yScale(dest.name))
          .attr("width", xScale.bandwidth()).attr("height", yScale.bandwidth())
          .attr("fill", (d_month, i) => colors[getMonthSeasonType(dest, i)])
          .on("mouseover", function(event, monthAbbr) {
            d3.select(this).style("stroke", "#3B82F6").style("stroke-width", "2px"); 
            const monthIndex = monthNamesAbbr.indexOf(monthAbbr);
            const seasonType = getMonthSeasonType(dest, monthIndex);
            const swellInfo = getMonthSwellInfo(dest, monthIndex);
            const fullMonthName = monthNames[monthIndex];
            
            timelineTooltip.transition().duration(200).style("opacity", .9);
            timelineTooltip.html(
              `<strong>${dest.name} - ${fullMonthName}</strong><br/>
               Season: ${seasonType.charAt(0).toUpperCase() + seasonType.slice(1)}<br/>
               Swell: ${swellInfo}`
            )
            .style("left", (event.pageX - d3Container.current.getBoundingClientRect().left + 15) + "px")
            .style("top", (event.pageY - d3Container.current.getBoundingClientRect().top - 28) + "px");
          })
          .on("mouseout", function() {
            d3.select(this).style("stroke", null);
            timelineTooltip.transition().duration(500).style("opacity", 0);
          });
      });

      const legendData = [
        { label: "High Season", color: colors.high },
        { label: "Shoulder Season", color: colors.shoulder },
        { label: "Off Season", color: colors.off }
      ];
      const legend = svg.selectAll(".legend").data(legendData).enter().append("g")
        .attr("class", "legend").attr("transform", (d, i) => `translate(${i * 150}, ${height + margin.bottom - 10})`); 
      legend.append("rect").attr("x", 0).attr("width", legendRectSize).attr("height", legendRectSize).style("fill", d => d.color);
      legend.append("text").attr("x", legendRectSize + legendSpacing).attr("y", legendRectSize / 2).attr("dy", ".35em")
        .style("text-anchor", "start").style("font-size", "12px").attr("fill", colors.textDefault).text(d => d.label);
    }
  }, [sortedDestinations]); 

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-6 overflow-x-auto relative">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-700 mb-4 text-center">
        Surf Season Timeline
      </h2>
      <div ref={d3Container} className="d3-chart-container w-full"></div>
    </div>
  );
};

export default D3TimelineChart;