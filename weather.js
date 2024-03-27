const form = document.querySelector(".input");
const input = document.getElementById("city-input");
const button = document.getElementById("search");
const weatherCard = document.getElementById("weather-card");
const apiKey = "38e1f142ca32a2b3bbd223e9af528712";

form.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = input.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
})

async function getWeatherData(city) {
    
    const apiUrl ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeather(data) {
    
    const {name: city, main:{temp,humidity},weather:[{description,id}]} = data;
    
    weatherCard.textContent = "";
    weatherCard.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const cloudsDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("city");

    tempDisplay.textContent = (temp-273.15).toFixed(1)+"°C";
    tempDisplay.classList.add("temp");

    humidityDisplay.textContent = "Humidity: "+humidity+"%";
    humidityDisplay.classList.add("humidity");
    
    cloudsDisplay.textContent = description;
    cloudsDisplay.classList.add("clouds");

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("emoji");
    
    weatherCard.appendChild(cityDisplay);
    weatherCard.appendChild(tempDisplay);
    weatherCard.appendChild(humidityDisplay);
    weatherCard.appendChild(cloudsDisplay);
    weatherCard.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId) {
    
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case (weatherId >= 300 && weatherId < 400):
                return "🌧️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
    
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case (weatherId === 800):
            return "☀️";

        case (weatherId >= 800 && weatherId < 810):
            return "☁️";

        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorDisplay);
}



