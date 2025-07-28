const params = new URLSearchParams(window.location.search);
const address = params.get("address");

const displayAddress = document.querySelector("header .address");
displayAddress.textContent = address;

let now = new Date();
let hourNow = now.getHours();
let monthNow = now.getMonth();
let dateNow = now.getDate();

const num_cards=11;

let condition = document.querySelector("header .condition");
let temp = document.querySelector("header .temp");

let max = document.querySelector("header .max");
let min = document.querySelector("header .min");
let feels_like = document.querySelector("header .feels_like");
let currentLocation = document.querySelector(".currentLocation");
let description = document.querySelector(".description");

let hourlyCardsContainer = document.querySelector(".hourlyCardsContainer");
let dailyCardsContainer = document.querySelector(".dailyCardsContainer");

const monthAbbr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const hours24 = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
  "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
  "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];


function displayHourlyCards(container, data, hourNow) {

    let hours_data = data.days[0].hours;

    for (let i = 0; i < num_cards; i++) {
        if(i>= hours_data.length){
            hours_data = data.days[1].hours;
            
        }
        let hourCard = document.createElement("div");
        hourCard.className = "card";

        const time = document.createElement("div");
        if (hourNow + i > 23) {
            time.textContent = hours24[hourNow+i-1-23];
            
        } else {
            time.textContent = hours24[hourNow+i];
        }
        
        hourCard.appendChild(time);

        const icon = document.createElement("img");
        icon.className = "icons";
        icon.src = `WeatherIcons-main/WeatherIcons-main/PNG/2nd Set - Color/${hours_data[i].icon}.png`;
        hourCard.appendChild(icon);

        const temp = document.createElement("div");
        temp.textContent = hours_data[i].temp + "  °F";
        hourCard.appendChild(temp);

        container.append(hourCard);
    }
}

function displayDailyCards(container, days_data) {
    for (let i = 0; i < num_cards; i++) {
        const day = days_data[i];
        if (!day) continue;

        const dayCard = document.createElement("div");
        dayCard.className = 'card';

        const dateDiv = document.createElement("div");
        const dateObj = new Date(day.datetime);
        const dateStr = `${dateObj.getDate()} ${monthAbbr[dateObj.getMonth()]}`;
        dateDiv.textContent = dateStr;
        dayCard.appendChild(dateDiv);

        const icon = document.createElement("img");
        icon.className = "icons";
        icon.src = `WeatherIcons-main/WeatherIcons-main/PNG/2nd Set - Color/${day.icon}.png`;
        dayCard.appendChild(icon);

        const tempDiv = document.createElement("div");
        tempDiv.textContent = `${day.temp}°F`;
        dayCard.appendChild(tempDiv);

        container.appendChild(dayCard);
    }
}

async function getData(location) {
    try {
        const response =
            await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=9SHKL2BBGMWUGSHP794WRTQUJ
`);
        if (!response.ok) {
            console.error("API error:", response.status, response.statusText);
            return;
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (e) {
        console.log("Can't get data", e);
    }
}

getData(address).then((data) => {
    weatherData = data;

    condition.textContent = data.currentConditions.conditions;
    temp.textContent = data.currentConditions.temp + " °F";
    max.textContent = data.days[0].tempmax;
    min.textContent = data.days[0].tempmin;
    feels_like.textContent = data.currentConditions.feelslike;
    currentLocation.textContent = data.resolvedAddress + ":";
    description.textContent = data.description;

    try {
        if (data.days[0].hours) {
            displayHourlyCards(hourlyCardsContainer, data, hourNow);
        } else {
            console.warn("No hourly data available.");
        }
    } catch (e) {
        console.error("Error rendering hourly forecast:", e);
    }

    try {
        if (data.days) {
            displayDailyCards(dailyCardsContainer, data.days, dateNow, monthNow);
        } else {
            console.warn("No daily data available.");
        }
    } catch (e) {
        console.error("Error rendering daily forecast:", e);
    }

    
});
