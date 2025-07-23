// const today_temp;
// const tomorrow_temp;

const params = new URLSearchParams(window.location.search);
const address = params.get('address') || 'Hyderabad'; 

// fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=DYV5MUUAHW7F6RUV8SGT64XDU`)
//     .then(response =>{
//         return response.json()
//     })
//     .then(response =>{
//         console.log(response)
//         console.log(response.address)
//     })

async function getData(location){
    try{
        const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=DYV5MUUAHW7F6RUV8SGT64XDU`)
        const json = await data.json();
        console.log(json);
        return json;
    }
    catch{
        console.log("Can't get data")
    }
}

getData(address);
