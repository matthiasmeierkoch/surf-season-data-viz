import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
// Corrected import for topojson-client:
import { feature as topojsonFeature } from 'topojson-client';


// --- Month Data ---
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthNamesAbbr = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// --- Surf Destination Data with Coordinates ---
const destinationsInfo = [
  {
    name: "North Shore, Oahu, Hawaii", country: "USA",
    latitude: 21.65, longitude: -158.05,
    periods: [{ type: "high", months: [11, 0, 1] }, { type: "shoulder", months: [10, 2] }],
    swellData: { 0: "10-15ft+", 1: "10-15ft+", 2: "6-10ft", 3:"3-5ft", 4:"2-4ft", 5:"1-3ft", 6:"1-3ft", 7:"2-4ft", 8:"3-5ft", 9:"5-8ft", 10: "8-12ft", 11: "10-15ft+" }
  },
  {
    name: "Puerto Escondido, Mexico", country: "Mexico",
    latitude: 15.86, longitude: -97.07,
    periods: [{ type: "high", months: [4, 5, 6, 7] }, { type: "shoulder", months: [3, 8, 9] }],
    swellData: { 0:"3-5ft", 1:"3-5ft", 2:"4-6ft", 3: "5-8ft", 4: "8-12ft+", 5: "8-12ft+", 6: "8-12ft+", 7: "6-10ft", 8: "5-8ft", 9: "4-7ft", 10:"3-6ft", 11:"3-5ft" }
  },
  {
    name: "Taghazout, Morocco", country: "Morocco",
    latitude: 30.54, longitude: -9.71,
    periods: [{ type: "high", months: [10, 11, 0, 1, 2] }, { type: "shoulder", months: [9, 3] }],
    swellData: { 0: "6-10ft", 1: "6-10ft", 2: "5-8ft", 3: "4-6ft", 4:"2-4ft", 5:"1-3ft", 6:"1-3ft", 7:"2-4ft", 8:"3-5ft", 9: "5-8ft", 10: "6-10ft", 11: "6-10ft" }
  },
  {
    name: "Margaret River, Australia", country: "Australia",
    latitude: -33.95, longitude: 115.07,
    periods: [{ type: "high", months: [2, 3, 4, 5] }, { type: "shoulder", months: [1, 6, 7, 8, 9] }],
    swellData: {0:"5-8ft", 1: "6-10ft", 2: "8-12ft", 3: "8-12ft+", 4: "8-12ft+", 5: "6-10ft", 6:"6-10ft", 7:"5-8ft", 8:"5-8ft", 9:"6-10ft", 10:"5-8ft", 11:"5-8ft"}
  },
  {
    name: "Canary Islands, Spain", country: "Spain", 
    latitude: 28.2916, longitude: -16.6291,
    periods: [{ type: "high", months: [9, 10, 11, 0, 1, 2] }, { type: "shoulder", months: [3, 4, 8] }],
    swellData: { 0: "6-10ft", 1: "6-10ft", 2: "5-8ft", 3:"4-6ft", 4:"3-5ft", 5:"2-4ft", 6:"2-4ft", 7:"3-5ft", 8: "4-7ft", 9: "6-10ft", 10: "6-10ft", 11: "6-10ft" }
  },
  {
    name: "Gold Coast, Australia", country: "Australia",
    latitude: -28.0167, longitude: 153.4000,
    periods: [{ type: "high", months: [1, 2, 3, 4] }, { type: "shoulder", months: [0, 5, 11] }],
    swellData: { 0: "3-6ft", 1: "4-8ft", 2: "5-10ft", 3: "5-10ft", 4: "4-8ft", 5: "3-5ft", 6:"2-4ft", 7:"2-4ft", 8:"3-5ft", 9:"3-6ft", 10:"3-6ft", 11: "3-6ft" }
  },
  {
    name: "Mentawai Islands, Indonesia", country: "Indonesia", 
    latitude: -2.15, longitude: 99.66,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8] }, { type: "shoulder", months: [2, 9] }],
    swellData: { 0:"3-5ft", 1:"3-5ft", 2: "4-8ft", 3: "6-10ft", 4: "6-10ft+", 5: "6-10ft+", 6: "6-10ft+", 7: "6-10ft", 8: "5-8ft", 9: "4-8ft", 10:"3-6ft", 11:"3-5ft" }
  },
  {
    name: "Jeffreys Bay, South Africa", country: "South Africa",
    latitude: -34.05, longitude: 24.92,
    periods: [{ type: "high", months: [5, 6, 7] }, { type: "shoulder", months: [3, 4, 8] }],
    swellData: { 0:"3-5ft", 1:"3-6ft", 2:"4-6ft", 3: "5-8ft", 4: "6-10ft", 5: "8-12ft+", 6: "8-12ft+", 7: "6-10ft", 8: "5-8ft", 9:"4-6ft", 10:"3-5ft", 11:"3-5ft" }
  },
  {
    name: "Cloudbreak, Fiji", country: "Fiji",
    latitude: -17.85, longitude: 177.20,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [2, 10] }],
    swellData: { 0:"3-6ft", 1:"4-8ft", 2: "6-10ft", 3: "8-12ft+", 4: "8-15ft+", 5:"8-15ft+", 6:"8-15ft+", 7:"8-12ft+", 8:"6-10ft", 9:"5-8ft", 10: "4-8ft", 11:"3-6ft" }
  },
  {
    name: "Bali, Indonesia", country: "Indonesia", 
    latitude: -8.7192, longitude: 115.1686,
    periods: [{ type: "high", months: [4, 5, 6, 7, 8] }, { type: "shoulder", months: [3, 9] }],
    swellData: { 0:"2-4ft", 1:"2-4ft", 2:"3-5ft", 3: "4-8ft", 4: "5-8ft+", 5: "5-8ft+", 6:"5-8ft+", 7:"4-8ft", 8:"3-6ft", 9: "3-5ft", 10:"2-4ft", 11:"2-4ft" }
  },
  {
    name: "Hossegor, France", country: "France",
    latitude: 43.67, longitude: -1.43,
    periods: [{ type: "high", months: [8, 9] }, { type: "shoulder", months: [5, 6, 7, 10] }],
    swellData: { 0:"3-6ft", 1:"3-6ft", 2:"4-7ft", 3:"4-7ft", 4:"5-8ft", 5:"6-10ft", 6:"5-8ft", 7: "6-10ft", 8: "8-12ft+", 9: "8-12ft+", 10: "6-10ft", 11:"5-8ft" }
  },
  {
    name: "Portugal (General)", country: "Portugal", 
    latitude: 38.7223, longitude: -9.1393,
    periods: [{ type: "high", months: [9, 10, 11, 0, 1, 2] }, { type: "shoulder", months: [3, 4, 8] }],
    swellData: { 0: "6-12ft", 1: "6-12ft", 2:"5-10ft", 3:"4-8ft", 4:"3-6ft", 5:"2-5ft", 6:"2-4ft", 7:"3-5ft", 8: "4-8ft", 9: "6-10ft", 10: "8-15ft+", 11: "8-15ft+" }
  },
  {
    name: "Santa Teresa, Costa Rica", country: "Costa Rica",
    latitude: 9.64, longitude: -85.17,
    periods: [{ type: "high", months: [2, 3, 4, 5, 6, 7, 8] }, { type: "shoulder", months: [0, 1, 9, 10, 11] }],
    swellData: { 0: "3-5ft", 1: "3-6ft", 2:"4-7ft", 3:"5-8ft", 4:"5-8ft", 5:"4-7ft", 6:"4-7ft", 7:"4-6ft", 8:"3-6ft", 9: "3-5ft", 10: "2-4ft", 11: "2-4ft" }
  },
  {
    name: "Nicaragua (Pacific Coast)", country: "Nicaragua", 
    latitude: 11.47, longitude: -86.13,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [2, 10] }],
    swellData: { 0:"2-4ft", 1:"2-4ft", 2: "3-6ft", 3: "4-8ft", 4:"5-8ft+", 5:"5-8ft+", 6:"5-8ft+", 7:"4-7ft", 8:"4-7ft", 9:"3-6ft", 10: "3-5ft", 11:"2-4ft" }
  },
  {
    name: "El Salvador (La Libertad area)", country: "El Salvador",
    latitude: 13.49, longitude: -89.32,
    periods: [{ type: "high", months: [2, 3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [1, 10] }],
    swellData: { 0:"2-4ft", 1: "3-5ft", 2: "4-7ft", 3:"5-8ft+", 4:"6-10ft", 5:"6-10ft", 6:"5-8ft", 7:"5-8ft", 8:"4-7ft", 9:"3-6ft", 10: "3-5ft", 11:"2-4ft" }
  },
  {
    name: "Arugam Bay, Sri Lanka", country: "Sri Lanka",
    latitude: 6.8418, longitude: 81.8304,
    periods: [{ type: "high", months: [4, 5, 6, 7, 8] }, { type: "shoulder", months: [3, 9] }], // Main season May-Sep
    swellData: { 0:"1-3ft", 1:"1-3ft", 2:"2-4ft", 3: "3-6ft", 4: "4-8ft", 5: "4-8ft", 6: "4-8ft", 7: "3-6ft", 8: "3-6ft", 9: "2-5ft", 10:"1-3ft", 11:"1-3ft" }
  },
  {
    name: "Baja California (Pacific Sur), Mexico", country: "Mexico", // Approx Todos Santos / Cerritos
    latitude: 23.35, longitude: -110.18,
    periods: [{ type: "high", months: [3, 4, 5, 6, 7, 8, 9] }, { type: "shoulder", months: [2, 10] }], // South swells
    swellData: { 0:"3-6ft (N)", 1:"3-6ft (N)", 2: "4-7ft", 3: "5-8ft", 4: "6-10ft", 5: "6-10ft", 6: "5-8ft", 7: "5-8ft", 8: "4-7ft", 9: "4-7ft", 10: "3-6ft", 11:"3-6ft (N)" }
  }
];


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

// --- D3WorldMap Component ---
const D3WorldMap = ({ destinations }) => {
  const d3MapContainer = useRef(null);
  const [worldData, setWorldData] = useState(null);
  const mapUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; 

  useEffect(() => {
    d3.json(mapUrl).then(data => {
      setWorldData(data); 
    }).catch(error => console.error("Error fetching map data:", error));
  }, []);

  useEffect(() => {
    if (destinations && destinations.length > 0 && d3MapContainer.current && worldData) {
      const container = d3.select(d3MapContainer.current);
      container.selectAll("*").remove();

      const width = 600; 
      const height = 400; 
      const colors = getSeasonColors();

      const svg = container.append("svg")
        .attr("width", "100%") // Make SVG responsive
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`) // Maintain aspect ratio
        .style("background-color", "#A8D8F8"); 

      const projection = d3.geoNaturalEarth1()
        .scale(width / 1.8 / Math.PI) 
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      const mapTooltip = d3.select(d3MapContainer.current) 
        .append("div")
        .attr("class", "d3-tooltip map-tooltip") 
        .style("opacity", 0)
        .style("position", "absolute")
        .style("pointer-events", "none");

      if (worldData.objects && worldData.objects.countries) {
        const countries = topojsonFeature(worldData, worldData.objects.countries);
        svg.append("g")
          .selectAll("path")
          .data(countries.features)
          .enter().append("path")
          .attr("d", path)
          .attr("fill", colors.mapLand)
          .attr("stroke", colors.mapBorder)
          .attr("stroke-width", 0.5);
      } else if (worldData.type === "FeatureCollection") { 
        svg.append("g")
          .selectAll("path")
          .data(worldData.features)
          .enter().append("path")
          .attr("d", path)
          .attr("fill", colors.mapLand)
          .attr("stroke", colors.mapBorder)
          .attr("stroke-width", 0.5);
      } else {
        console.warn("Map data is not in expected TopoJSON or GeoJSON format for countries.");
      }

      svg.append("g")
        .selectAll("circle")
        .data(destinations.filter(d => d.latitude != null && d.longitude != null))
        .enter().append("circle")
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("r", 5)
        .attr("fill", colors.mapMarker)
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 1.5)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
          d3.select(this).attr("r", 7);
          mapTooltip.transition().duration(200).style("opacity", .9);
          mapTooltip.html(`<strong>${d.name}</strong><br/>${d.country}`)
            .style("left", (event.pageX - d3MapContainer.current.getBoundingClientRect().left + 10) + "px")
            .style("top", (event.pageY - d3MapContainer.current.getBoundingClientRect().top - 30) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 5);
          mapTooltip.transition().duration(500).style("opacity", 0);
        });
    }
  }, [destinations, worldData]);

  return (
     <div ref={d3MapContainer} className="d3-map-container relative w-full h-[400px] sm:h-[450px] md:h-[500px]">
        {/* D3 map will be appended here */}
     </div>
  );
};

// --- D3TimelineChart Component ---
const D3TimelineChart = ({ destinations }) => {
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
      // Adjusted width to better fit single column layout, and ensure it's not too wide
      const timelineContainerWidth = d3Container.current.clientWidth || 800; // Get parent width or default
      const width = Math.min(timelineContainerWidth - margin.left - margin.right, 700); // Max width for timeline itself
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

      const legendData = [{ label: "High Season", color: colors.high }, { label: "Shoulder Season", color: colors.shoulder }, { label: "Off Season", color: colors.off }];
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

// --- Main App Component ---
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-indigo-600 p-4 sm:p-8 font-sans">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
          Global Surf Season Guide
        </h1>
        <p className="text-lg text-sky-100 mt-2">
          Explore surf seasons, swell sizes, and locations.
        </p>
      </header>

      {/* Updated to single column layout */}
      <main className="max-w-4xl mx-auto grid grid-cols-1 gap-8 items-start">
        <div className="w-full"> {/* Map container */}
             <D3WorldMap destinations={destinationsInfo} />
        </div>
        <div className="w-full"> {/* Timeline container */}
            <D3TimelineChart destinations={destinationsInfo} />
        </div>
      </main>

      <footer className="text-center mt-8 sm:mt-12 text-sm text-sky-200">
        <p>&copy; {new Date().getFullYear()} Surf Season Guide. Plan your next wave!</p>
      </footer>
       <style>{`
        .d3-tooltip {
          text-align: left;
          padding: 8px;
          font: 12px sans-serif;
          background: rgba(0,0,0,0.8);
          color: white;
          border: 0px;
          border-radius: 8px;
          transition: opacity 0.2s; 
          z-index: 10; 
        }
        .y-axis .tick text tspan.country-label { 
            fill: #6B7280; 
            font-size: 9px;
        }
        /* Ensure map container has a defined height if SVG is 100% height */
        .d3-map-container {
            min-height: 400px; /* Or a specific height */
        }
      `}</style>
    </div>
  );
}

export default App;