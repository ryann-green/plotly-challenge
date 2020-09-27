d3.json("data/data.json").then((importedData) => {
    // console.log(importedData)}
    let data = importedData;

    console.log(data);

    // create the list of the data names that will go into the dropdown menu
    let names = data.names;

    // add each name as an option value value
    let dropdownmenu = d3.select("#selDataset");

    names.forEach(function(name){

        // append a list item for every name in the names list
        let value = dropdownmenu.append("option").attr("value", name)

        // make the text value in the box equal the name
        value.text(name)

    });

     // select the value of the property in the dropdown
     let dName = dropdownmenu.property("value");

     // create a filter function to allow the id of the sample to equal the value in the dropdown box
     function filterSamples(i) {

         // return the id that is equal to the dropdown value option
         return i.id == dName
     };
 
     // run the filter on the dataset
     let filteredSamples = data.samples.filter(filterSamples)[0]

     let sampleValues = filteredSamples.sample_values;
     let otuIDs = filteredSamples.otu_ids;
     let otuLabels = filteredSamples.otu_labels;

     // bar & bubble chart variables

     // this wil be the values for the bar chart
     // this wil also be the y valyes and marker size for the bubble chart
     let topTenValues = sampleValues.slice(0,10);
     
     // this will be the labels for the bar chart
     // this will also be the x values and the marker colors for the bubble chart
     let topTenOtuIDs = otuIDs.slice(0,10);
     let OtuIDstrings = topTenOtuIDs.map(elem => `otu: ${elem}`);

     // this will be the hovertext for the bar chart
     // this will also be the text values for the bubble chart
     let topTenLabels = otuLabels.slice(0,10);
     
     let trace1 = {
         x: topTenValues.reverse(),
         y: OtuIDstrings.reverse(),
         type: "bar",
         orientation: "h"
     };

     let stuff = [trace1];

     let layout = {
         title: "Otu Sample values",
         xaxis: { title: "Sample Values" },
         yaxis: { title: "OTU IDs"}
     };

     Plotly.newPlot("barh", stuff, layout);

     var trace2 = {
         x: otuIDs,
         y: sampleValues,
         mode: 'markers',
         marker: {
           size: sampleValues
         }
       };
       
       let bubble1 = [trace2];
       
       var layout2 = {
         title: 'Sample Values vs OTU IDs',
         showlegend: false,
         xaxis: { title: "OTU IDs" },
         yaxis: { title: "Sample Values"}
      
       };
       
       Plotly.newPlot('bubble', bubble1, layout2);

     let metadata = data.metadata.filter(filterSamples)[0]

     let metadatahtml = d3.select("#sample-metadata");

     
     console.log(metadata);




    // Call updatePlotly() when a change takes place to the DOM
    d3.select("#selDataset").on("change", updatePlotly); 

    // function updateplotly that will run everytime the selection is changed in the dropdown
    function updatePlotly() {

        // select the value of the property in the dropdown
        let dName = dropdownmenu.property("value");

        // create a filter function to allow the id of the sample to equal the value in the dropdown box
        function filterSamples(i) {

            // return the id that is equal to the dropdown value option
            return i.id == dName
        };
    
        // run the filter on the dataset
        let filteredSamples = data.samples.filter(filterSamples)[0]

        let sampleValues = filteredSamples.sample_values;
        let otuIDs = filteredSamples.otu_ids;
        let otuLabels = filteredSamples.otu_labels;

        // bar & bubble chart variables

        // this wil be the values for the bar chart
        // this wil also be the y valyes and marker size for the bubble chart
        let topTenValues = sampleValues.slice(0,10);
        
        // this will be the labels for the bar chart
        // this will also be the x values and the marker colors for the bubble chart
        let topTenOtuIDs = otuIDs.slice(0,10);
        let OtuIDstrings = topTenOtuIDs.map(elem => `otu: ${elem}`);

        // this will be the hovertext for the bar chart
        // this will also be the text values for the bubble chart
        let topTenLabels = otuLabels.slice(0,10);
        
        let trace1 = {
            x: topTenValues.reverse(),
            y: OtuIDstrings.reverse(),
            type: "bar",
            orientation: "h"
        };

        let stuff = [trace1];

        let layout = {
            title: "Otu Sample values",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs"}
        };

        Plotly.newPlot("barh", stuff, layout);

        var trace2 = {
            x: otuIDs,
            y: sampleValues,
            mode: 'markers',
            marker: {
              size: sampleValues
            }
          };
          
          let bubble1 = [trace2];
          
          var layout2 = {
            title: 'Sample Values vs OTU IDs',
            showlegend: false,
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values"}
         
          };
          
          Plotly.newPlot('bubble', bubble1, layout2);

        let metadata = data.metadata.filter(filterSamples)[0]

        let metadatahtml = d3.select("#sample-metadata");

        
        console.log(metadata);


       

    };

});
