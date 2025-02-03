const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Reemplaza con tu API key de OpenWeatherMap
const city = 'Bogotá'; // Ciudad por defecto

const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const currentTemp = document.getElementById('current-temp');
const weatherDescription = document.getElementById('weather-description');
const forecastContainer = document.getElementById('forecast-container');

function updateWeather(data) {
    cityElement.textContent = data.name;
    dateElement.textContent = new Date().toLocaleDateString();
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    currentTemp.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;

    // Pronóstico para los próximos días (ejemplo)
    const forecastData = data.list.slice(1, 6); // Obtiene datos de los próximos 5 días
    forecastContainer.innerHTML = ''; // Limpia el contenedor
    forecastData.forEach(item => {
        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
        forecastDay.innerHTML = `
            <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="Icono del tiempo">
            <p>${new Date(item.dt * 1000).toLocaleDateString('es-CO', { weekday: 'short' })}</p>
            <p>${Math.round(item.main.temp)}°C</p>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

// Obtener datos del tiempo
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
    .then(response => response.json())
    .then(data => {
        updateWeather(data);
    });

// Obtener pronóstico para los próximos días (ejemplo)
fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`)
    .then(response => response.json())
    .then(data => {
        updateWeather({ ...data.city, ...data.list[0], list: data.list }); // Combina datos de la ciudad y el primer día con la lista de pronósticos
    });
