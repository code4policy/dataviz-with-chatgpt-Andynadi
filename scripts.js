// Load the CSV file
d3.csv("data/boston_311_2023_by_reason.csv").then(data => {
  // Parse and sort data by count
  data.forEach(d => {
    d.Count = +d.Count; // Convert count to number
  });
  const top10 = data.sort((a, b) => b.Count - a.Count).slice(0, 10);

  // Set dimensions
  const margin = { top: 100, right: 50, bottom: 50, left: 300 },
        width = 900 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#barChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create scales
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleBand().range([0, height]).padding(0.3);

  // Initial chart: Top 10 reasons
  updateChart(top10);

  // Function to update the chart with new data
  function updateChart(data) {
    // Update scales
    x.domain([0, d3.max(data, d => d.Count)]);
    y.domain(data.map(d => d.reason));

    // Bind data to bars
    const bars = svg.selectAll(".bar").data(data);

    // Remove old bars
    bars.exit().remove();

    // Add new bars
    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .merge(bars)
      .transition()
      .duration(1000)
      .attr("y", d => y(d.reason))
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("width", d => x(d.Count))
      .attr("fill", (d, i) => ["blue", "yellow", "red", "purple", "black", "brown", "orange", "darkblue", "darkgreen", "pink"][i % 10]); // Cycle colors

    // Update axes
    svg.selectAll(".axis").remove(); // Clear previous axes

    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y))
      .style("font-size", "12px");

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(10))
      .style("font-size", "12px");
  }

  // Button click: Show all reasons
  d3.select("#showAllButton").on("click", () => {
    const allData = data.sort((a, b) => b.Count - a.Count); // Sort all data by count
    const extendedHeight = allData.length * 30; // Calculate new height dynamically

    // Update SVG height
    d3.select("#barChart")
      .attr("height", extendedHeight + margin.top + margin.bottom);

    // Update y scale range
    y.range([0, extendedHeight]);

    updateChart(allData);
  });
}).catch(error => console.error(error));
