// components/BarChart.tsx
'use client';

// import React, BarChart from MUI, and D3
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type DataPoint = {
  category: string;
  value: number;
};

// Data for dangerous substances
type BarChartProps = {
  data: DataPoint[];
  timeMode: 'week' | 'month';
  mode: 'nutrition' | 'hazard';
  measurement: 'grams' | 'ounces';
};

// Key Map because some titles have spaces
const keyMap = {
  'Saturated Fats': 'saturatedFats',
  'Trans Fats': 'transFats',
  Calories: 'calories',
  Cholesterol: 'cholesterol',
  Sodium: 'sodium',
  Carbohydrates: 'carbohydrates',
  Fiber: 'fiber',
  Sugar: 'sugar',
  Protein: 'protein'
};


// Some global consts needed to be defined here to use later on
const margin = { top: 20, right: 20, bottom: 100, left: 50 };

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
  const { width, height } = getDimensions();

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
export default function Chart({ data, timeMode, mode, measurement }: BarChartProps) {
  // React ref for SVG
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Call getDimensions here too
  const { width, height, innerWidth, innerHeight } = getDimensions();

  // svg and D3 need to be under useEffect()
  const drawChart = (data) => {
    
    // Check if its nutrition or hazardous materials
    const isNutrition = mode === 'nutrition';

    // Check if array is valid
    if (!Array.isArray(data) || data.length === 0) return;

    // clear svg
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // get max value early to be used later on
    const maxValue = d3.max(Array.isArray(data) ? data : [], d => d.value) ?? 0;

    // X Scale and Y Scale
    const xScale = d3.scaleBand()
      .domain((Array.isArray(data) ? data : []).map(d => d.category))
      .range([0, innerWidth])
      .padding(0.1);

    // Y-Axis scale
    const yScale = d3.scaleLinear()
      .domain([0, maxValue * 1.1])
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
    // Create gridTicks each 0.5 apart
    let gridTicks = d3.range(0, 20000, 1000);

    if(mode === 'nutrition'){
      gridTicks = d3.range(0, 20000, 1000);
    }
    else{
      gridTicks = d3.range(0, 0.01, 0.0001);
    }

    // add lines behind the bars barely visible, 0.5 apart
    // numbers should be 0.00001 apart instead of 0.5 (done so further down)
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

    // Separate 0.00001 axis ticks from line ticks above
    // We are measuring tiny values
    // Unless doing nutrition
    let yAxisTicks = d3.range(0, 20000, 1000);
    
    if(mode === 'nutrition'){
      yAxisTicks = d3.range(0, 20000, 1000);
    }
    else{
      yAxisTicks = d3.range(0, 0.01, 0.0001);
    }

    // yAxis calls custom const yAxisTicks that have 0.0001 intervals
    // Unless doing nutrition
    const yAxis = d3.axisLeft(yScale)
      .tickValues(yAxisTicks)
      .tickFormat(x => isNutrition ? `${x}` : Number(x).toFixed(5));

    // Appends it to svg
    chart.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Bars (must be called after gridlines or gridlines will appear in front of bars)
    // Color turns red if above weekly limit
    const nutritionalThresholds = {
      calories: 2000 * 7,
      saturatedFats: 20 * 7,
      transFats: 2 * 7,
      cholesterol: 0.3 * 7,
      sodium: 2.3 * 7,
      carbohydrates: 275 * 7,
      fiber: 28 * 7,
      sugar: 50 * 7,
      protein: 50 * 7
    };

    const nutritionalThresholdsMonthly =
      timeMode === 'month'
        ? {
            calories: nutritionalThresholds.calories * 4,
            saturatedFats: nutritionalThresholds.saturatedFats * 4,
            transFats: nutritionalThresholds.transFats * 4,
            cholesterol: nutritionalThresholds.cholesterol * 4,
            sodium: nutritionalThresholds.sodium * 4,
            carbohydrates: nutritionalThresholds.carbohydrates * 4,
            fiber: nutritionalThresholds.fiber * 4,
            sugar: nutritionalThresholds.sugar * 4,
            protein: nutritionalThresholds.protein * 4
          }
        : nutritionalThresholds;

    const GRAMS_PER_OUNCE = 28.3495;

    const nutritionalThresholdsOunces =
      Number(measurement) === 1
        ? {
            calories: 2000 * 7,
            saturatedFats: (20 * 7) / GRAMS_PER_OUNCE,
            transFats: (2 * 7) / GRAMS_PER_OUNCE,
            cholesterol: (0.3 * 7) / GRAMS_PER_OUNCE,
            sodium: (2.3 * 7) / GRAMS_PER_OUNCE,
            carbohydrates: (275 * 7) / GRAMS_PER_OUNCE,
            fiber: (28 * 7) / GRAMS_PER_OUNCE,
            sugar: (50 * 7) / GRAMS_PER_OUNCE,
            protein: (50 * 7) / GRAMS_PER_OUNCE
          }
            : nutritionalThresholds;

    const nutritionalThresholdsMonthlyOunces =
      timeMode === 'month' && Number(measurement) === 1
        ? {
            calories: 2000 * 7 * 4,
            saturatedFats: (20 * 7 * 4) / GRAMS_PER_OUNCE,
            transFats: (2 * 7 * 4) / GRAMS_PER_OUNCE,
            cholesterol: (0.3 * 7 * 4) / GRAMS_PER_OUNCE,
            sodium: (2.3 * 7 * 4) / GRAMS_PER_OUNCE,
            carbohydrates: (275 * 7 * 4) / GRAMS_PER_OUNCE,
            fiber: (28 * 7 * 4) / GRAMS_PER_OUNCE,
            sugar: (50 * 7 * 4) / GRAMS_PER_OUNCE,
            protein: (50 * 7 * 4) / GRAMS_PER_OUNCE
          }
            : nutritionalThresholdsMonthly;


    // Hazardous substances
    const baseThresholds = {
      Arsenic: 1.5e-4,
      Mercury: 1.1e-4,
      Cadmium: 5.0e-4
    };

    const thresholds =
      timeMode === 'month'
        ? {
            Arsenic: baseThresholds.Arsenic * 4,
            Mercury: baseThresholds.Mercury * 4,
            Cadmium: baseThresholds.Cadmium * 4
          }
        : baseThresholds;

    // Weekly thresholds in ounces
    const OUNCES_PER_GRAM = 0.03527396;

    const heavyMetalThresholdsOunces =
      Number(measurement) === 1
        ? {
            Arsenic: (1.5e-4) * OUNCES_PER_GRAM,
            Mercury: (1.1e-4) * OUNCES_PER_GRAM,
            Cadmium: (5.0e-4) * OUNCES_PER_GRAM
          }
        : baseThresholds;

    // Monthly thresholds in ounces
    const heavyMetalThresholdsMonthlyOunces =
      timeMode === 'month' && Number(measurement) === 1
        ? {
            Arsenic: (1.5e-4 * 7) * OUNCES_PER_GRAM,
            Mercury: (1.1e-4 * 7) * OUNCES_PER_GRAM,
            Cadmium: (5.0e-4 * 7) * OUNCES_PER_GRAM
          }
        : thresholds;

    chart.selectAll('rect')
    .data(data, d => d.category)
    .join(
      enter => enter.append('rect')
        .attr('x', d => xScale(d.category)!)
        .attr('width', xScale.bandwidth())
        .attr('y', d => yScale(d.value))
        .attr('height', d => innerHeight - yScale(d.value ?? 0))
        //Fills based on if the values are above the thresholds for each week
        .attr('fill', d => {
          const key = keyMap[d.category] ?? d.category;
          const rawThreshold = mode === 'nutrition'
            ? nutritionalThresholdsMonthly[key]
            : thresholds[d.category];

          // Convert threshold to ounces if needed
          const threshold = Number(measurement) === 1
            ? rawThreshold / GRAMS_PER_OUNCE
            : rawThreshold;

          return d.value > threshold ? '#d32f2f' : '#1976d2';
        }),
        update => update
        .transition()
        .duration(500)
        .attr('y', d => yScale(d.value))
        .attr('height', d => innerHeight - yScale(d.value ?? 0)),
      exit => exit.remove()
    );

    // Labels
    // Years
    chart.selectAll('.x-label')
    .data(data, d => d.category)
    .join(
      enter => enter.append('text')
        .attr('class', 'x-label')
        .attr('text-anchor', 'middle'),
      update => update,
      exit => exit.remove()
    )
    .attr('x', d => xScale(d.category)! + xScale.bandwidth() / 2)
    .attr('y', innerHeight + 30)
    .text(d => d.category);

    // X-axis label
    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 130)
      .text("Current food/beverage substance levels")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");

    // Y-axis label
    svg.append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .text("Total Values (grams)")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");

      // Little Bars above the years
      chart.selectAll('.bar-marker')
        .data(data, d => d.category)
        .join(
          enter => enter.append('line')
            .attr('class', 'bar-marker'),
          update => update,
          exit => exit.remove()
        )
        .attr('x1', d => xScale(d.category)! + xScale.bandwidth() / 2)
        .attr('x2', d => xScale(d.category)! + xScale.bandwidth() / 2)
        .attr('y1', innerHeight)
        .attr('y2', innerHeight + 10)
        .attr('stroke', '#000')
        .attr('stroke-width', 2);

        // Check if data is valid
        if (!Array.isArray(data))
          return;
  };
  
  useEffect(() => {
  if (!Array.isArray(data)) return;

  drawChart(data);
}, [data, mode, measurement]);

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
      </svg>
    </div>
  );
}