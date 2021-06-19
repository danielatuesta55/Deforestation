// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData


// Step 1 - INITIAL DISPLAY FUNCTION
function init() {
  // STEP A - Select the drop down element
  let selector = d3.select("#selDataset");

  // STEP B - Pull in id data from samples.json
  d3.json("./data/samples.json").then((incomingData) => {
      console.log(incomingData)
      let namedata = incomingData.names;
      // console.log(namedata)

      // STEP C - Grab each individual name and insert into the drop down    
      namedata.forEach((name) => {
        // console.log(name);
        selector
        .append("option")
        .text(name)
        .property("value", name);
      });
      

      // STEP D - Call funciton to display initial plots and info
      plotbar(incomingData.samples[0]);
        console.log(incomingData.samples[0]);
      plotbubble(incomingData.samples[0]);
      displayinfo(incomingData.metadata[0]);
  });
}
  
// STEP 2 - CALL init() FUNCTION TO RUN ON BROWSER STARTUP
init();


// STEP 3 - CREATE A FUNCTION THAT UPDATES PLOTS & INFO TO "selectedSample" FROM DROP DOWN. 

// NOTE: Naming optionChanged as function already accessible in index file  
function optionChanged(selectedSample) {
  // STEP A - Pull in sample values from samples data for graphing
  d3.json("./data/samples.json").then((incomingData) => {

  // STEP B - Create variables specific to plotting data called otuData and metaData
  let otuData = incomingData.samples 
  let metaData = incomingData.metadata

  // STEP C - Filter this data to only include the selected sample

  // Make drop down otuData == to selectedSample
  let filteredOtuData = otuData.filter(sample => sample.id == selectedSample);
    // console.log(filteredOtuData[0]);

    // Run plot bar & bubble functions
    plotbar(filteredOtuData[0]);
    plotbubble(filteredOtuData[0]);

  // Make drop down metaData == to selectedSample
  let filteredMetaData = metaData.filter(sample => sample.id == selectedSample);  
    // console.log(filteredMetaData[0]);

    // Run display info function
    displayinfo(filteredMetaData[0]);
  });
};


// Step 4 - CREATE FUNCTION TO PLOT BAR GRAPH
function plotbar(selectedSample) {
  // console.log(selectedSample)

  // variable to hold top 10 otuIDs
  let otuIds = (selectedSample.otu_ids.slice(0, 10)).reverse();
    // console.log(otuIds)

  // variable to hold top 10 otuLabels  
  let otuLabels = (selectedSample.otu_labels.slice(0, 10)).reverse();
    // console.log(otuLabels)

  // variable to hold top 10 sampleValues  
  let sampleValues = (selectedSample.sample_values.slice(0, 10)).reverse();
    // console.log(sampleValues)

  // Create a label combining OTU + otuIds
  let otuIdplot = otuIds.map(d => "OTU " + d);
  console.log(`OTU IDS: ${otuIdplot}`)

  // Plot Horizontal Bar Graph

  // Trace1 for the Sample Data
  var trace1 = {
    x: sampleValues,
    y: otuIdplot,
    text: otuLabels,
    marker: {
      color: 'light blue'
    },
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };

  // Create chartData to insert into newPlot() function
  var chartData = [trace1];

  // Format the layout of the plot
  var layoutBar = {
    title: "Top 10 OTUs",
    yaxis: {
      tickmode: "linear",
    },
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Plot bar chart
  Plotly.newPlot("bar", chartData, layoutBar);
};


// Step 4 - CREATE FUNCTION TO PLOT BUBBLE CHART
function plotbubble(d) {
  // Plot Bubble Chart
  let trace2 = {
    x: d.otu_ids,
    y: d.sample_values,
    mode: "markers",
    marker: {
        size: d.sample_values,
        color: d.otu_ids,
        colorscale: "Earth"
    },
    text: d.otu_labels
  };

  // Create bubbleData to insert into newPlot() function
  let bubbleData = [trace2];

  // Format layout of bubble chart
  let layoutBubble = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000
  };

  // Plot bubble chart
  Plotly.newPlot("bubble", bubbleData, layoutBubble);
};


// Step 5 - CREATE FUNCTION TO DISPLAY DEMOGRAPHIC INFO
function displayinfo(filteredMetaData) {
  console.log(filteredMetaData)

  // Step A - Display "metadata" under "Demographic Info"

    // Select element to insert demo info into, remove all info currently in element
    d3.select("#sample-metadata")
    .text("");

    // Call the object filteredMetaData, loop through key & data for each, and append values into the html
    Object.entries(filteredMetaData).forEach(([key, value]) => 
      // console.log(`${key}: ${value}`);
      d3.select("#sample-metadata")
       .append("h5")
       .text(`${key}: ${value}`));  
};