// const today_temp;
// const tomorrow_temp;

const params = new URLSearchParams(window.location.search);
const address = params.get('address'); 


const displayAddress = document.querySelector('header .address');
displayAddress.textContent = address;

let now = new Date();
let hourNow = now.getHours();


let condition = document.querySelector('header .condition');
let temp = document.querySelector('header .temp');

let max = document.querySelector('header .max')
let min = document.querySelector('header .min')
let feels_like = document.querySelector('header .feels_like')
let currentLocation = document.querySelector('.currentLocation')
let description = document.querySelector('.description')
let hourlyCardsContainer = document.querySelector('.hourlyCardsContainer')
let dailyCardsContainer = document.querySelector('.dailyCardsContainer');

const monthAbbr = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function convertHour(epoch){
    const dateUTC = new Date(epoch * 1000);
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const dateIST = new Date(dateUTC.getTime() + istOffsetMs);
    return dateIST.getHours();
}

function displayHourlyCards(container, hours_data, hourNow){
    for(let i = hourNow; i<hourNow+10; i++){
        let hourCard = document.createElement('div');
        hourCard.className='card';
        
        const time = document.createElement('div');
        if(hourNow>12){
            time.textContent = String(i-12) + ' PM'
        }
        else{
            time.textContent = String(i) + ' AM'
        }
        hourCard.appendChild(time);

        
        const icon = document.createElement('img');
        icon.className='icons';
        icon.src=`WeatherIcons-main/WeatherIcons-main/PNG/2nd Set - Color/${hours_data[i].icon}.png`
        hourCard.appendChild(icon);
        
        const temp = document.createElement('div');
        temp.textContent = hours_data[i].temp + '  °F';
        hourCard.appendChild(temp);

        container.append(hourCard);
    }
}


async function getData(location){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=9SHKL2BBGMWUGSHP794WRTQUJ
`);
        if (!response.ok) {
            console.error('API error:', response.status, response.statusText);
            return;
        }
        const json = await response.json();
        console.log(json);
        return json;
    }
    catch(e){
        console.log("Can't get data", e)
    }
}



getData(address).then(data =>{
    weatherData= data;

    condition.textContent = data.currentConditions.conditions;
    temp.textContent = data.currentConditions.temp + ' °F';
    max.textContent = data.days[0].tempmax;
    min.textContent = data.days[0].tempmin;
    feels_like.textContent = data.currentConditions.feelslike
    currentLocation.textContent = data.resolvedAddress + ':';
    description.textContent = data.description;

    displayHourlyCards(hourlyCardsContainer, data.days[0].hours, hourNow);


    
})


