d3.json("data/data.json").then((importedData) => {
    // console.log(importedData)}

    // Call updatePlotly() when a change takes place to the DOM
    d3.select("#selDataset").on("change", updatePlotly); 

    
    let data = importedData;

    console.log(data);

    // create the list of the data names that will go into the dropdown menu
    let names = data.names;

    // add each name as an option value value
    let dropdownmenu = d3.select("#selDataset");
    
    // let dataset = dropdownMenu.property("value");

    names.forEach(function(name){

        // append a list item for every name in the names list
        let value = dropdownmenu.append("option").attr("value", name)

        // make the text value in the box equal the name
        value.text(name)
    });

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
        let filteredSamples = data.samples.filter(filterSamples);
    
        let sampleValues = filteredSamples.map( i => i.sample_values);
        let otuIDs = filteredSamples.map(i => i.otu_ids)
        let otuLabels = filteredSamples.map(i => i.otu_labels)


        let topTenValues = sampleValues.map(i => i.slice(0,10));
        let topTenOtuIDs = otuIDs.map(i => i.slice(0,10));
        let topTenLabels = otuLabels .map(i => i.slice(0,10));

        // console.log(topTen);

        console.log(`Id is ${dName}, Top 10 sample values are ${topTenValues}`);
        console.log(`Id is ${dName}, Top 10 sample values are ${topTenOtuIDs}`);
        console.log(`Id is ${dName}, Top 10 sample values are ${topTenLabels}`);

    };



   
















});








// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");

// need slice, filter, and map functions