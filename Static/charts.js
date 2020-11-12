//create function to biuld charts and then update them based on changed ID..
let queryurl="http://api/v1.0/monthly"
// function createPlots(id) {

    d3.json(queryurl, function(data) {
        console.log(data)
        // let dataCopy = data;
        // let dataSample = dataCopy.samples;
        // console.log(dataSample);

//         let filteredData = dataSample.filter(item => item.id.toString() === id)[0];
//         console.log(filteredData);
   
//         let otuIds = filteredData.otu_ids;
//         console.log(otuIds);
//         let otuSliced =  otuIds.slice(0, 10);
//         console.log(otuSliced);
//         let otuIdNamed = otuSliced.map(id => "OTU " + id);
//         console.log(otuIdNamed);

//         let otuLabels = filteredData.otu_labels;
//         console.log(otuLabels);

//         let sampleValues = filteredData.sample_values;
//         console.log(sampleValues);
        
//         // build bar chart..
//         let trace1 = {
//             x: sampleValues.slice(0, 10).reverse(),
//             y: otuIdNamed.reverse(),
//             orientation: 'h',
//             type: 'bar',
//             text: otuLabels.slice(0, 10).reverse()
//         };

//         let dataTrace = [trace1];
    
//         let barLayout = {
//             title: "Bacteria Concentration Bar Chart",
//             margin: {
//                 l: 100,
//                 r: 100,
//                 t: 100,
//                 b: 100
//             }
//         };
    
//         Plotly.newPlot('bar', dataTrace, barLayout); 

//        // build gauge chart..
//         let dataMeta = dataCopy.metadata;
//         console.log(dataMeta);
        
//         let filteredMeta = dataMeta.filter(item => item.id.toString() === id)[0];
//         console.log(filteredMeta);
        
//         let wfreq = filteredMeta.wfreq;
//         console.log(wfreq);

//         // Enter the washing frequency between 0 and 180
//         let level = parseFloat(wfreq) * 20;
//         // Trig to calc meter point
//         let degrees = 180 - level;
//         let radius = 0.5;
//         let radians = (degrees * Math.PI) / 180;
//         let x = radius * Math.cos(radians);
//         let y = radius * Math.sin(radians);

//         // Path: may have to change to create a better triangle
//         let mainPath = "M -.0 -0.05 L .0 0.05 L ";
//         let pathX = String(x);
//         let space = " ";
//         let pathY = String(y);
//         let pathEnd = " Z";
//         let path = mainPath.concat(pathX, space, pathY, pathEnd);
//         let gaugeData = [
//             {
//                 type: "scatter",
//                 x: [0],
//                 y: [0],
//                 marker: { size: 12, color: "850000" },
//                 showlegend: false,
//                 name: "Freq",
//                 text: level,
//                 hoverinfo: "text+name"
//             },
//             {
//                 values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//                 rotation: 90,
//                 text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//                 textinfo: "text",
//                 textposition: "inside",
//                 marker: {
//                     colors: [
//                         "rgba(0, 105, 11, .5)",
//                         "rgba(10, 120, 22, .5)",
//                         "rgba(14, 127, 0, .5)",
//                         "rgba(110, 154, 22, .5)",
//                         "rgba(170, 202, 42, .5)",
//                         "rgba(202, 209, 95, .5)",
//                         "rgba(210, 206, 145, .5)",
//                         "rgba(232, 226, 202, .5)",
//                         "rgba(240, 230, 215, .5)",
//                         "rgba(255, 255, 255, 0)"
//                     ]
//                 },
//                 labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//                 hoverinfo: "label",
//                 hole: 0.5,
//                 type: "pie",
//                 showlegend: false
//             }
//         ];

//         let gaugeLayout = {
//             shapes: [
//                 {
//                     type: "path",
//                     path: path,
//                     fillcolor: "850000",
//                     line: {
//                         color: "850000"
//                     }
//                 }
//             ],
//             title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
//             height: 500,
//             width: 500,
//             xaxis: {
//                 zeroline: false,
//                 showticklabels: false,
//                 showgrid: false,
//                 range: [-1, 1]
//             },
//             yaxis: {
//                 zeroline: false,
//                 showticklabels: false,
//                 showgrid: false,
//                 range: [-1, 1]
//             }
//         };

//         // let GAUGE = document.getElementById("gauge");
//         Plotly.newPlot("gauge", gaugeData, gaugeLayout);
//         console.log(gaugeData)

//     // build bubble chart
//        let bubbleTrace = {
//            x: otuIds,
//            y: sampleValues,
//            mode: "markers",
//            marker: {
//                size: sampleValues,
//                color: otuIds
//            },
//            text: otuLabels
//        };

//        let bubbleData = [bubbleTrace];

//        let bubbleLayout = {
//            xaxis: {title: "OTU ID"},
//            yaxis: {title: "Sample Values"},
//            height: 500,
//            width: 900,
//            title: "Bacteria Concentration Bubble Chart"
//         };

//        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
// };

// // function to display demographic information for selected ID..
// function createDemographic(id) {
//     d3.json("../data/samples.json").then(data => {
//         let dataCopy1 = data;
//         let metaData = dataCopy1.metadata;
//         console.log(metaData);

//         let filteredMetaData = metaData.filter(item => item.id.toString() === id)[0]
//         console.log(filteredMetaData);
        
//         let demographicInfo = d3.select("#sample-metadata");
//         console.log(demographicInfo);
//         demographicInfo.html("");
//         Object.entries(filteredMetaData).forEach(key => {
//             demographicInfo
//                 .append("h5")
//                 .text(key[0] + ": " + key[1])         
//         });
//     });
// };

// // update function ID selection button..
// function optionChanged(id) {
//     createPlots(id);
//     createDemographic(id);
// }

// // intial function for updating charts based on ID selected..
// function init() {
//     let testIdButton = d3.select("#selDataset");
//     console.log(testIdButton)
//     d3.json("../data/samples.json").then(function(data) {
//         let dataCopy2 = data;
//         console.log(dataCopy2.names);
//         dataCopy2.names.forEach(name => {
//             testIdButton.append("option")         
//                 .text(name)        
//                 .property("value")
       
//         });
       
//         createPlots(dataCopy2.names[0]);
//         createDemographic(dataCopy2.names[0]);
//     });
// };

// init();