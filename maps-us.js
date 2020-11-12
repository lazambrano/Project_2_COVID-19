
document.querySelector("body").style.backgroundColor = "";

var list = [];
let response = fetch(
  "https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST?disableRedirect=true"
)
  .then((response) => response.json())
  .then((data) => {
    var myList = data.casesByState;
    for (let index = 0; index < myList.length; index++) {
      list[index] = myList[index];
    }
  })
  .catch((err) => {
    console.log("sorry it didn't work");
  });

setTimeout(analyzeData, 2000);
setTimeout(visualizeDataToMap, 3000);
var stateCovidData = [];

function analyzeData() {
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    let name = abbrState(element.name);
    list.name = name;
    stateCovidData[i] = { name: name, cases: element.casesReported };
  }
  console.log(stateCovidData);
}

function visualizeDataToMap() {
  var filtered = stateCovidData.filter((element) => element.name != null);

  for (let i = 0; i < filtered.length; i++) {
    const element = filtered[i];
    if (element != null) {
      let color = mapCasesToColor(element.cases);
      document.getElementById(element.name).style.fill = color;
    }
  }
  console.log("done!");
}
function mapCasesToColor(cases) {
  if (cases < 1000) {
    return "#CDFF63";
  } else if (cases > 1000 && cases < 5000) {
    return "#FEF001";
  } else if (cases > 5000 && cases < 10000) {
    return "#FFCE03";
  } else if (cases > 10000 && cases < 50000) {
    return "#FD9A01";
  } else if (cases > 50000 && cases < 100000) {
    return "#FD6104";
  } else {
    return "#FF2C05";
  }
}

function onhover(elem) {
  let a = stateCovidData.filter((state) => state.name === elem.id);
  document.getElementById("stateName").innerHTML = "State: " + a[0].name;
  document.getElementById("casesReported").innerHTML = " Cases: " + a[0].cases;
  // console.log(elem.getAttribute("d"));
}

//> 50,000 === #FEF001
//50,000 - 100,000 === #FFCE03
//100,000 - 200,000 === #FD9A01
//200,000 - 300,000 === #FD6104
//300,000 <  === #FF2C05

function abbrState(input) {
  var states = [
    ["Arizona", "AZ"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  for (i = 0; i < states.length; i++) {
    if (states[i][0] == input) {
      return states[i][1];
    }
  }
  return null;
}

// states = [
//   "AL",
//   "AK",
//   "AS",
//   "AZ",
//   "AR",
//   "CA",
//   "CO",
//   "CT",
//   "DE",
//   "DC",
//   "FM",
//   "FL",
//   "GA",
//   "GU",
//   "HI",
//   "ID",
//   "IL",
//   "IN",
//   "IA",
//   "KS",
//   "KY",
//   "LA",
//   "ME",
//   "MH",
//   "MD",
//   "MA",
//   "MI",
//   "MN",
//   "MS",
//   "MO",
//   "MT",
//   "NE",
//   "NV",
//   "NH",
//   "NJ",
//   "NM",
//   "NY",
//   "NC",
//   "ND",
//   "MP",
//   "OH",
//   "OK",
//   "OR",
//   "PW",
//   "PA",
//   "PR",
//   "RI",
//   "SC",
//   "SD",
//   "TN",
//   "TX",
//   "UT",
//   "VT",
//   "VI",
//   "VA",
//   "WA",
//   "WV",
//   "WI",
//   "WY",
// ];

