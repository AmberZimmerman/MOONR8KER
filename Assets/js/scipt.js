
/**
 * Dan's to-do
 * 
 * PSEUDOCODE
 * 
 * variables for moonphases, activities types, logic for datepickers, 
 * 
 * UI:
 *  USER - Location?...
 *  USER - Select Date (Default: now) Picker: https://materializecss.com/pickers.html
 *  USER - Select Participants (Dropdown?)
 *  USER - Select Price (Dropdown?)
 *  USER - Find Activities Button
 *              
 * INIT
 *  Query Local storage for saved activities, then RENDER
 * 
 * FETCH
 *  MoonPhase at Select Date
 *  Return MoonPhase
 *      Returned Moonphase sets activities availbile
 *      Random number to select activity use some sort of weighted bell curve
 *          (Math.floor((Math.random * x) + (Math.random * y)) -1) Maximum sum of x+y-1 should be equal to activitiesArray.length
 *      Return selected activity(s)
 * 
 * FETCH
 *  Bored ?={Participants}&{Price}&{Type}
 * 
 * RENDER
 *  List of datapoints pulled from return of Bored API results
 * 
 * STORE
 *  With button save rendered datapoints to local storage
 *  On same button, add datapoints to an array
 * 
 * 
 * 
 * 
 */

// moon cycle is 29.53 (according to wiki)

console.log("Greetings from Cthulhu");
console.log("^(;,;)^");

// let moonPhase = [
//     {
//         phase: "new moon",
//         mood: "new beginnings",
//         activity: [],
//     },
//     {   
//         phase: "waxing crescent",
//         mood: "set intetnions",
//         activity: [],
//     },
//     {
//         phase: "first quarter",
//         mood: "take action",
//         activity: [],
//     },
//     {
//         phase: "waxing gibbous",
//         mood: "Refine and hone",
//         activity: [],
//     },
//     {
//         phase: "full",
//         mood: "Harvest Endeavors",
//         activity: [],
//     },
//     {
//         phase: "waning gibbous",
//         mood: "introspect",
//         activity: [],
//     },
//     {
//         phase: "third quarter",
//         mood: "relase and let go",
//         activity: [],
//     },
//     {
//         phase: "waning crescent",
//         mood: "surrender",
//         activity: [],
//     }
// ];


// const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&include=daily&appid=e1eb99be58f229feb0f00b803ac936d3`

let dateUTC = 1646100558;
// let dateUTC = new Date(2022-02-10);

// console.log(dateUTC2);

let moonPhaseUrl = `https://api.farmsense.net/v1/moonphases/?d=${dateUTC}`

let boredUrl = "https://www.boredapi.com/api/activity?"

let activityObject = [ { 
    date: "",
    activity: "",
    phaseName: "",
} ]

//testing
var today = new Date().toISOString().split('T')[0];
console.log(today)

// selecting the date element in the DOM
let dateEl = document.getElementById('date');

// initializing the date picker
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    // var instances = M.Datepicker.init(elems, options);
  });


  let startBtn = document.getElementById('start-btn')

  startBtn.addEventListener('click', activity)


  // function that triggers on button press
  function activity() {
      console.log(dateEl.value)
      let date = dateEl.value;

      // splits the date in to an arrray[year, month, day]
      let newDate = date.split('-')

      console.log(newDate)
      let year = newDate[0];
      let month = newDate[1]
      let day = newDate[2]
      let protoDateUTC = new Date(`${year}, ${month}, ${day}`);
      console.log(protoDateUTC);
      let dateUTC = (protoDateUTC.getTime() / 1000);
      console.log(dateUTC);
  }

// calculates days from today to the selected date  
// function dayCalc(day) {
//     let now = Math.floor(today.getTime() / 1000)
//     let newDay = Math.floor(day.getTime() / 1000)

//     return (newDay - now);
// }



fetch(moonPhaseUrl)
    .then(function(response) {
        
        return response.json();
    })
    .then(function (moonData) {
        console.log(moonData);
        

        var phase = moonData.Phase;
        // var dateNow = new Date(weatherData.daily[0].moonrise);
                
        
        // let mPhase = "";
        let type = "";
        
        // assigns the activity types to the phase
        if (phase = 'New') {

            type = "type=education";
        }

        else if (phase = 'Waxing Crescent') {

            type = "type=busywork&type=education"
        }

        else if (phase = 'First Quarter') {
            
            type= "type=recreational&type=diy&type=cooking&type=relaxation";
        }

        else if (phase = 'Waxing Gibbous') {

            type = "type=recreation&type=ecucation&type=diy";
        }

        else if (phase = 'Full') {

            type = "type=social&type=relaxation&type=music";
        }

        else if (phase = 'Waning Gibbous') {
            
            type = "type=social&type=music&type=charity";
        }

        else if (phase = 'Last Quarter') {
            
            type = "type=charity"
        }

        else if (phase = 'Waning Crescent') {
            
            type = "type=recreation";
        }

        console.log(`the moon phase is ${phase}.`)
        Object.defineProperties(activityObject, {
            phaseName: {value: phase},
            date: {value: date}
        });

        // adds the activities based on the moon phase to the url
        boredUrl += type;

        // fetches the activity
        fetch(boredUrl)
        .then (function(response) {
            return response.json();
        })

        // adds the activity to the object
        .then (function (activityData) {
            console.log(`Your suggested activity is: ${activityData.activity}`);
            Object.defineProperties(activityObject, {
                activity: {value: activityData.activity}
            });
            console.log(activityObject);
        })
        // return weatherData;
    })


        
        

// This function calculates the number of days between current day and selected day

// function daysBetween(datePicked, dateNow) {
//     var secondsPerDay = 24 * 60 * 60;
//     var daysDistance = (datePicked - dateNow) / secondsPerDay;
//     return daysDistance
// };
// console.log("days Between");
// console.log(daysBetween(1644602400, 1644256800))

//This function advances the phase based on an estimated "phasePerDay" and the current nowPhase.  Consider modifying the check to see if we can pull phase from the weather app first (if datePicked <= dateNow + (7 days of UTC seconds))
// var phasePerDay = 0.0314;
// var nowPhase = weatherData.daily[0].moon_phase;

// function phaseAdvanced(daysDistance) {
//     var phasePerDay = 0.03;
//     var currentPhase = (daysDistance * phasePerDay) + nowPhase;
//     if (currentPhase > 1 || currentPhase !== 0) {
//         while (currentPhase > 1) {
//             currentPhase = currentPhase -1
//         }
//     } else {
//         currentPhase = currentPhase;
//     } return currentPhase
// }
// console.log("Phase value");
// console.log(phaseAdvanced(daysBetween(1644602400, 1644256800)));


//Basics of saving activities to local storage.  Each activity will be put in an object with date, phase and activity, and then pushed to a saved activities array.
let savedActivities = [];
// let storedActivities = [];

var savedAct = {
    phase: "",
    date: "",
    activity: "",
}


function saveAct(currentPhase, date, activity) {
    var newSavedAct = Object.create(savedAct);
    savedAct.phase = futurePhase;
    savedAct.date = date;
    savedAct.activity = activity;
    
    savedActivities.push(newSavedAct);
    localStorage.setItem("activities", JSON.stringify(savedActivities));  
}

function renderActivities() {
    let storedActivities = JSON.parse(localStorage.getItem("activities"));
    if (storedActivities !== null) {
    savedActivities = storedActivities
    }
}

// var getFarm = function () {
//     var farmMoon = `https://api.farmsense.net/v1/moonphases/?d=1646100558`;
//     fetch(farmMoon).then (function (farmResponse) {
//         if (farmResponse.ok) {
//             farmResponse.json().then (function (farmData) {
//                 console.log(farmData);
//             })
//         }
//     })
// }

// getFarm();
// var getMoon = function () {
//     var moonAPI = `
//     https://mooncalc.org/#/33.44,94.04,zoom/date/time/objectlevel/maptype`;
//     fetch(moonAPI).then (function (moonResponce) {
//         if (moonResponce.ok) {
//             moonResponce.json().then (function (moonData) {
//                 console.log(moonData);
//             })
//         }
//     })
// }

// getMoon;

