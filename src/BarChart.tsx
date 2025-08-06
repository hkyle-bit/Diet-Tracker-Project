// components/BarChart.tsx
'use client';

// import React, BarChart from MUI, and D3
import React, { useEffect, useRef } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import * as d3 from 'd3';

// Some global consts needed to be defined here to use later on
const margin = { top: 20, right: 20, bottom: 50, left: 50 };

// Dimension function so responsive dimensions can be reused
const getDimensions = () => {
  // Make sure window needs to be defined first, or else it is 0x0
  if (typeof window === "undefined") {
    return { width: 0, height: 0, innerWidth: 0, innerHeight: 0 };
  }

  // Non hard-coded dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return { width, height, innerWidth, innerHeight, margin };
};

// responsive resize of chart function
const MySVGComponent = ({ gl, display }: { gl: WebGLRenderingContext | null; display: () => void }) => {
  // React ref for SVG
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Call getDimensions()
  const { width, height, innerWidth, innerHeight } = getDimensions();

  // Everything must be in a useEffect()
  useEffect(() => {
    // Create handleResize() which deals with resizing
    function handleResize() {
      const svg = svgRef.current;
      if (!svg || !gl) return;

      svg.setAttribute("width", width.toString());
      svg.setAttribute("height", height.toString());

      gl.viewport(0, 0, width, height);
      display();
    }

    // Listens for resize and calls handleResize()
    window.addEventListener("resize", handleResize);
    handleResize();

    // Remove resize listener when complete
    return () => window.removeEventListener("resize", handleResize);
  }, [gl, display]);

  // Allows calling of svgRef later on as a prop in <svg/> under return
  return <svg ref={svgRef} />;
};

// Default function
export default function Chart() {
  // React ref for SVG
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Call getDimensions here too
  const { width, height, innerWidth, innerHeight } = getDimensions();

  // svg and D3 need to be under useEffect()
  useEffect(() => {
    // clear svg
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // given data
    const data = [
      { category: '1950', value: 2.525 },
      { category: '1960', value: 3.018 },
      { category: '1970', value: 3.682 },
      { category: '1980', value: 4.440 },
      { category: '1990', value: 5.310 },
      { category: '2000', value: 6.127 },
      { category: '2010', value: 6.930 },
    ];

    // X Scale and Y Scale
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, innerWidth])
      .padding(0.1);

    // Did + 0.07 so 7.0 would be the max without 2 lines.
    // 0.07 makes it overlap with the max to match with homework 4 picture.
    // This is because maxValue was 6.930.
    // 6.930 + 0.07 = 7.00
    // By default, it created two separate lines.
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)! + 0.07])
      .range([innerHeight, 0]);

    // Root SVG properties for the top-level SVG container
    svg
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid #ccc');

    // Chart Group that appends to svg/tells it to add margins
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Axes
    // Get the max value from data and sets it to maxValue
    // Create gridTicks each 0.5 apart
    const maxValue = d3.max(data, d => d.value)!;
    const gridTicks = d3.range(0, Math.ceil(maxValue) + 0.5, 0.5);

    // add lines behind the bars barely visible, 0.5 apart
    // numbers should be 1.0 apart instead of 0.5 (done so further down)
    const gridGroup = chart.append('g').attr('class', 'gridlines');

    // line ticks
    gridGroup.selectAll('line')
      .data(gridTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('stroke', '#ddd')
      .attr('stroke-width', 1);

    // Separate 1.0 axis ticks from line ticks above
    const yAxisTicks = d3.range(0, Math.ceil(maxValue) + 1, 1);

    // yAxis calls custom const yAxisTicks that have 1.0 intervals
    const yAxis = d3.axisLeft(yScale)
      .tickValues(yAxisTicks)
      .tickFormat(d3.format('.0f'));

    // Appends it to svg
    chart.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Bars (must be called after gridlines or gridlines will appear in front of bars)
    // Correct color was determined by inspect tool
    chart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.category)!)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value))
      .attr('fill', '#42A5F5');

    // Labels
    // Years
    chart.selectAll('.x-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'x-label')
      .attr('x', d => xScale(d.category)! + xScale.bandwidth() / 2)
      .attr('y', innerHeight + 30) // offset below bar
      .attr('text-anchor', 'middle')
      .text(d => d.category);

      // Little Bars above the years
      chart.selectAll('.bar-marker')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'bar-marker')
        .attr('x1', d => xScale(d.category)! + xScale.bandwidth() / 2)
        .attr('x2', d => xScale(d.category)! + xScale.bandwidth() / 2)
        .attr('y1', innerHeight)
        .attr('y2', innerHeight + 10)
        .attr('stroke', '#000')
        .attr('stroke-width', 2);

}, []);

  // div has variable width and height for responsiveness.
  // svg is created above and called down here.
  // BarChart is no longer used in here, but I will keep it because svg needs to cover the entire MUI component.
  // It gets removed anyway when Next creates the svg.
  // The new chart uses SVG entirely, so either way SVG fully covers the MUI Chart.
  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%' }}
      >
        <BarChart
          sx={{
            '& svg': {
              fill: 'white',
            },
          }}

          colors={['#42A5F5',]}

          xAxis={[
            {
              id: 'categories',
              data: ['1950', '1960', '1970', '1980', '1990', '2000', '2010'],
              scaleType: 'band',
              tickMinStep: 1,
              tickMaxStep: 1,
            },
          ]}
          
          yAxis={[
            { 
              min: 0,
              max: 7,  
              tickMinStep: 1,
              tickMaxStep: 1,
            }
          ]}

          series={[
            { data: [2.525, 3.018, 3.682, 4.440, 5.310, 6.127, 6.930] }
          ]}
          
          width={500}
          height={300}
          grid={{ horizontal: true }}
        >
        </BarChart>
      </svg>
    </div>
  );
}