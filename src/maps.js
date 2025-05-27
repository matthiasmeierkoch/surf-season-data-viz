import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature as topojsonFeature } from 'topojson-client';
import { destinationsInfo } from './data';

// Helper for map colors
const getSeasonColors = () => ({
  mapLand: '#E5E7EB',
  mapBorder: '#9CA3AF',
  mapMarker: '#EF4444'
});

const D3WorldMap = ({ destinations = destinationsInfo }) => {
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
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
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
     <div ref={d3MapContainer} className="d3-map-container w-full h-[350px] sm:h-[400px] md:h-[500px] rounded-xl shadow-lg overflow-hidden bg-slate-900">
        {/* D3 map will be appended here */}
     </div>
  );
};

export default D3WorldMap;