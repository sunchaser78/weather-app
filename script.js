// Replace direct API call with Vercel function endpoint
/* fetch(`https://weather-app-five-dun.vercel.app/api/getWeather?city=${encodeURIComponent(cityName)}`)
    .then(response => response.json())
    .then(data => {
        // Process the data
    })
    .catch(error => console.error('Error:', error));
    */



let currentCityTimezoneOffset = 0; // Global variable to store the timezone offset
const cities = [
    'Abu Dhabi', 'Amsterdam', 'Athens', 'Bangalore', 'Bangkok', 'Barcelona',
    'Beijing', 'Beirut', 'Belfast', 'Berlin', 'Bogotá', 'Boston', 'Brussels', 'Budapest', 
    'Buenos Aires', 'Cairo', 'Cape Town', 'Caracas', 'Chicago', 'Colombo', 
    'Copenhagen', 'Delhi', 'Dhaka', 'Doha', 'Dubai', 'Dublin', 'Edinburgh', 
    'Florence', 'Fukuoka', 'Geneva', 'Glasgow', 'Hanoi', 'Havana', 'Helsinki', 
    'Ho Chi Minh City', 'Hong Kong', 'Istanbul', 'Jakarta', 'Jerusalem', 
    'Johannesburg', 'Karachi', 'Kathmandu', 'Kingston', 'Kuala Lumpur', 
    'Kuwait City', 'Kyoto', 'Lahore', 'Las Vegas', 'Lima', 'Lisbon', 'London', 
    'Los Angeles', 'Luxembourg', 'Madrid', 'Malaga', 'Manila', 'Melbourne', 'Mexico City', 
    'Miami', 'Milan', 'Monaco', 'Moscow', 'Mumbai', 'Munich', 'Muscat', 
    'Nairobi', 'Naples', 'New York', 'Orlando', 'Osaka', 'Oslo', 'Paris', 
    'Prague', 'Pyongyang', 'Reykjavik', 'Rio de Janeiro', 'Rome', 'San Francisco', 
    'San Juan', 'Santiago', 'Santo Domingo', 'Sao Paulo', 'Sapporo', 'Seattle', 'Seoul', 'Shanghai', 
    'Singapore', 'Stockholm', 'Sydney', 'Taipei', 'Tehran', 'Tel Aviv', 'Thimphu', 
    'Tokyo', 'Toronto', 'Ulaanbaatar', 'Vancouver', 'Venice', 'Vienna', 'Warsaw', 
    'Washington, D.C.', 'Zurich'

];


// Call setDefaultCity, populateCitySelector, Calculate local on window load
window.onload = () => {
    populateCitySelector();
    setDefaultCity();
    setInterval(updateLocalTime, 1000); // Update time every second
};



// Populate cityselector with "Select City" as the first option
function populateCitySelector() {
    const citySelector = document.getElementById('city-selector');

    // Add 'Select City' as the first option
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select City';
    defaultOption.value = '';
    citySelector.appendChild(defaultOption);

    // Add other cities
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelector.appendChild(option);
    });
    sortCities()
    // Explicitly set 'Select City' as the default selected option
    citySelector.value = '';
}


// Puts cities in Order in citySelector
function sortCities() {

    cities.sort();
}

// City Selector Change Event Listener
document.getElementById('city-selector').addEventListener('change', function() {
    const selectedCity = this.value;
    fetchWeather(selectedCity);
    fetchForecast(selectedCity);
});



// Updates City Information and handles UI transitions
function updateCityInfo(cityName) {
    if(!cityName){
        return;
    }

    // Hide current text immediately upon new city selection
    document.getElementById('app').style.opacity = '0';

    // Show spinner
    document.getElementById('spinner').style.display = 'block';

    // Fetch both weather and image data
    Promise.all([fetchWeather(cityName), fetchCityImage(cityName)])
        .then(([weatherData, imageUrl]) => {
            updateUI(weatherData, imageUrl); // Update UI only after both data are fetched
            fetchForecast(cityName); // Fetch forecast data
        })
        .catch(error => {
            console.error('Error updating city info:', error);
            document.getElementById('spinner').style.display = 'none';
        });
}



// Function to select a random city
function selectRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length); // Random index from 0 to cities.length - 1
    const randomCity = cities[randomIndex];
    return randomCity;
}

// Function to set the default city on load
function setDefaultCity() {
    const defaultCity = selectRandomCity();
    updateCityInfo(defaultCity); // This function will handle the fetching and UI update
}


function fetchWeather(city) {
    fetch(`https://weather-app-five-dun.vercel.app/api/getWeather?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            updateUI(data); // Assuming updateUI function processes and displays the weather data
        })
        .catch(error => console.error('Error:', error));
}







function updateUI(weatherData, imageUrl) {
    // Update the city title
    const cityTitle = document.getElementById('city-title');
    cityTitle.textContent = `Weather in ${weatherData.name}`;

    // Update the local time (handled by the setInterval function)

    // Update the temperature
    const temperatureDisplay = document.getElementById('temperature');
    temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp.toFixed(1)}°C`;

    // Update the condition
    const conditionDisplay = document.getElementById('condition');
    conditionDisplay.textContent = `Condition: ${weatherData.weather[0].main}`;

    // Handle image loading
    if (imageUrl) {
        const img = new Image();
        img.onload = function() {
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundSize = 'cover';
            fadeInElements();
        };
        img.src = imageUrl;
    } else {
        fadeInElements();
    }
}

function fadeInElements() {
    setTimeout(() => {
        // Fade in the background image
        document.body.style.opacity = '1';
        // Fade in the weather info
        const weatherInfo = document.querySelector('.weather-info');
        if (weatherInfo) {
            weatherInfo.style.opacity = '1';
        }
        // Hide spinner after fade-in
        document.getElementById('spinner').style.display = 'none';
    }, 500); // Adjust delay for fade effect
}


// Function to calculate local time based on city's timezone offset
function calculateLocalTime(timezoneOffset) {
    const currentTime = new Date();
    const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    return localTime.toLocaleTimeString();
}

function updateLocalTime() {
    const localTimeElement = document.getElementById('local-time');
    if (localTimeElement) {
        localTimeElement.textContent = `Local Time: ${calculateLocalTime(currentCityTimezoneOffset)}`;
    }
}










// Fetch city image and handle spinner visibility
function fetchCityImage(cityName) {
    const accessKey = 'QYD_NuTsNc6JvRuPzRg4Lh71qrYO-4eZRTeulSCpDk8';
    const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${accessKey}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                return data.results[0].urls.regular; // Return image URL
            } else {
                console.log(`No images found for ${cityName}`);
                return null;
            }
        });
}


// Existing JavaScript code...

// Fetch 5-day forecast
function fetchForecast(cityName) {
    fetch(`https://weather-app-five-dun.vercel.app/api/getForecast?cityName=${encodeURIComponent(cityName)}`)
        .then(response => response.json())
        .then(data => {
            updateForecastUI(data); 
        })
        .catch(error => console.error('Error fetching forecast:', error));
}



// Process Forecast Data
function processForecastData(data) {
    const dailySummaries = {};
    data.list.forEach(entry => {
        const date = new Date(entry.dt_txt).toLocaleDateString();
        if (!dailySummaries[date]) {
            dailySummaries[date] = { temps: [], conditions: [], icons: [] };
        }
        dailySummaries[date].temps.push(entry.main.temp);
        dailySummaries[date].conditions.push(entry.weather[0].main);
        dailySummaries[date].icons.push(entry.weather[0].icon);
    });

    return Object.entries(dailySummaries).slice(0, 5).map(([date, info]) => {
        const avgTemp = info.temps.reduce((a, b) => a + b, 0) / info.temps.length;
        const mostCommonCondition = findMostFrequent(info.conditions);
        const mostCommonIcon = findMostFrequent(info.icons);
        return {
            date,
            avgTemp: avgTemp.toFixed(1),
            condition: mostCommonCondition,
            icon: `https://openweathermap.org/img/wn/${mostCommonIcon}@2x.png`
        };
    });
}

function findMostFrequent(arr) {
    const frequency = arr.reduce((count, item) => {
        count[item] = (count[item] || 0) + 1;
        return count;
    }, {});

    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
}

// Update Forecast UI
function updateForecastUI(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    forecastData.forEach(day => {
        const dayElem = document.createElement('div');
        dayElem.className = 'forecast-day';
        dayElem.innerHTML = `
            <p class="forecast-date">${day.date}</p>
            <img class="weather-icon" src="${day.icon}" alt="${day.condition}">
            <p class="average-temp">${day.avgTemp}°C</p>
        `;
        forecastContainer.appendChild(dayElem);
    });
}








