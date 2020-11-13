//create function to biuld charts and then update them based on changed ID..
let url="/api/v1.0/monthly"
console.log("hello")


// d3.json(url).then(function(data) {
//     let covidData = data;
//     console.log(covidData);
//     console.log(covidData);
    
    // let filteredData = covidData.filter(item => item.State === State);
    // console.log(filteredData);
// })
function createPlots(State) {
    // let State = ''
    
    d3.json(url).then(function(data) {

        let covidData = data.filter(item => item.State.toString() === State);
        // console.log(filteredRecovery);
        // let covidData = data;
        console.log(covidData);

        let states = [];
        covidData.forEach(item => states.push(item.State));
        console.log(states);

        let averageCases = [];
        covidData.forEach(item => averageCases.push(item.Average_cases));
        console.log(averageCases);

        let dates= [];
        covidData.forEach(item => dates.push(item.Date));
        console.log(dates);

        let averageDeaths = [];
        covidData.forEach(item => averageDeaths.push(item.Average_death));
        console.log(averageDeaths);

        let deathPercent = [];
        covidData.forEach(item => deathPercent.push(item.Death_percent));
        console.log(deathPercent);
        
//         // build bar chart..
        let trace1 = {
            x: averageCases.reverse(),
            y: dates.reverse(),
            orientation: 'h',
            type: 'bar',
            text: averageDeaths.reverse()
        };

        let dataTrace = [trace1];
    
        let barLayout = {
            title: "COVID-19 Average Cases And Deaths",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
    
        Plotly.newPlot('bar', dataTrace, barLayout); 

       // build gauge chart..
        // let recoveryData = covidData.Recovery_percent;
        // console.log(recoveryData);
        
        let filteredRecovery = covidData.filter(item => item.State.toString() === State);
        console.log(filteredRecovery);

        let recovery = [];
        filteredRecovery.forEach(item => recovery.push(item.Recovery_percent));
        // console.log(states);
        
        // let recovery = filteredRecovery.Recovery_percent;
        console.log(recovery);

        // Enter the washing frequency between 0 and 180
        let level = parseFloat(recovery)*1.7;
        // Trig to calc meter point
        let degrees = 180 - level;
        let radius = 0.5;
        let radians = (degrees * Math.PI) / 180;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        let mainPath = "M -.0 -0.05 L .0 0.05 L ";
        let pathX = String(x);
        let space = " ";
        let pathY = String(y);
        let pathEnd = " Z";
        let path = mainPath.concat(pathX, space, pathY, pathEnd);
        let gaugeData = [
            {
                type: "scatter",
                x: [0],
                y: [0],
                marker: { size: 12, color: "850000" },
                showlegend: false,
                name: "Freq",
                text: level,
                hoverinfo: "text+name"
            },
            {
                values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
                rotation: 90,
                text: ["99-100", "98-99", "97-98", "96-97", "95-96", "94-95", "93-94", "92-93", "91-92", "90-91", ""],
                textinfo: "text",
                textposition: "inside",
                marker: {
                    colors: [
                        "rgba(0, 100, 11, .5)",
                        "rgba(0, 105, 11, .5)",
                        "rgba(10, 120, 22, .5)",
                        "rgba(14, 127, 0, .5)",
                        "rgba(110, 154, 22, .5)",
                        "rgba(170, 202, 42, .5)",
                        "rgba(202, 209, 95, .5)",
                        "rgba(210, 206, 145, .5)",
                        "rgba(232, 226, 202, .5)",
                        "rgba(240, 230, 215, .5)",
                        "rgba(255, 255, 255, 0)"
                    ]
                },
                labels: ["99-100", "98-99", "97-98", "96-97", "95-96", "94-95", "93-94", "92-93", "91-92", "90-91", ""],
                hoverinfo: "label",
                hole: 0.5,
                type: "pie",
                showlegend: false
            }
        ];

        let gaugeLayout = {
            shapes: [
                {
                    type: "path",
                    path: path,
                    fillcolor: "850000",
                    line: {
                        color: "850000"
                    }
                }
            ],
            title: "<b>Recovery Percentage</b> <br> Per Total Confirmed Cases",
            height: 500,
            width: 500,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };

        // let GAUGE = document.getElementById("gauge");
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
        // console.log(gaugeData)

//     // build bubble chart
       let bubbleTrace = {
           x: dates,
           y: averageCases,
           mode: "lines",
           marker: {
               size:averageCases ,
               color: averageDeaths
           },
           text: deathPercent.reverse()
       };

       let bubbleData = [bubbleTrace];

       let bubbleLayout = {
           xaxis: {title: "Dates"},
           yaxis: {title: "Average Cases"},
           height: 500,
           width: 900,
           title: "Covid-19 Average Stats"
        };

       Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    }).catch(err => console.log(err));
};
// createPlots(State)

// // function to display demographic information for selected ID..
function createDemographic(State) {
    d3.json(url).then(data => {
        let dataCopy1 = data;
        // let metaData = dataCopy1.metadata;
        // console.log(metaData);

        let filteredData = dataCopy1.filter(item => item.State.toString() === State)[0]
        console.log(filteredData);
        
        let stateInfo = d3.select("#sample-metadata");
        console.log(stateInfo);
        stateInfo.html("");
        Object.entries(filteredData).forEach(key => {
            stateInfo
                .append("h5")
                .text(key[0] + ": " + key[1])         
        });
    });
};

// // update function ID selection button..
function optionChanged(State) {
    createPlots(State);
    createDemographic(State);
}

// // intial function for updating charts based on ID selected..
function init() {
    let testIdButton = d3.select("#selDataset");
    console.log(testIdButton)
    d3.json(url).then(function(data) {
        let dataCopy2 = data;
        console.log(dataCopy2);
        let states = [];
        dataCopy2.forEach(item => states.push(item.State));
        console.log(states);
        states.forEach(name => {
        testIdButton.append("option")         
            .text(name)        
            .property("value")
    
    });
       
        createPlots(states[0]);
        createDemographic(states[0]);
    });
};

init();