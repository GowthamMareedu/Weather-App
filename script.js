// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.API_KEY = '26c2a6127edf49c2a9e153735250211';
        this.currentTempUnit = 'celsius';
        this.currentWeatherData = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadDefaultWeather();
    }

    initializeElements() {
        // Search elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.suggestionsContainer = document.getElementById('suggestionsContainer');
        this.suggestionsList = document.getElementById('suggestionsList');
        
        // Display elements
        this.loading = document.getElementById('loading');
        this.weatherInfo = document.getElementById('weatherInfo');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Weather data elements
        this.cityName = document.getElementById('cityName');
        this.countryName = document.getElementById('countryName');
        this.localTime = document.getElementById('localTime');
        this.temperature = document.getElementById('temperature');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.weatherCondition = document.getElementById('weatherCondition');
        this.visibility = document.getElementById('visibility');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.feelsLike = document.getElementById('feelsLike');
        this.pressure = document.getElementById('pressure');
        this.uvIndex = document.getElementById('uvIndex');
        
        // Temperature toggle buttons
        this.celsiusBtn = document.getElementById('celsiusBtn');
        this.fahrenheitBtn = document.getElementById('fahrenheitBtn');
    }

    bindEvents() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // City suggestions
        this.cityInput.addEventListener('input', (e) => this.handleCityInput(e));
        this.cityInput.addEventListener('focus', () => this.showSuggestions());
        this.cityInput.addEventListener('blur', () => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => this.hideSuggestions(), 200);
        });
        
        // Temperature unit toggle
        this.celsiusBtn.addEventListener('click', () => this.toggleTemperatureUnit('celsius'));
        this.fahrenheitBtn.addEventListener('click', () => this.toggleTemperatureUnit('fahrenheit'));
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.cityInput.contains(e.target) && !this.suggestionsContainer.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    async loadDefaultWeather() {
        await this.getWeatherData('Vellore');
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        this.hideSuggestions();
        await this.getWeatherData(city);
    }

    async handleCityInput(e) {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        await this.getSuggestions(query);
    }

    async getSuggestions(query) {
        try {
            const url = `https://api.weatherapi.com/v1/search.json?key=${this.API_KEY}&q=${query}`;
            const response = await fetch(url);
            const suggestions = await response.json();
            
            this.displaySuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    displaySuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) {
            this.suggestionsList.innerHTML = '<div class="no-suggestions">No cities found</div>';
            this.showSuggestions();
            return;
        }

        const suggestionsHTML = suggestions.slice(0, 5).map(city => `
            <div class="suggestion-item" onclick="weatherApp.selectCity('${city.name}', '${city.region}', '${city.country}')">
                <div class="suggestion-main">
                    <div class="suggestion-city">${city.name}</div>
                    <div class="suggestion-details">${city.region}, ${city.country}</div>
                </div>
                <i class="fas fa-map-marker-alt suggestion-icon"></i>
            </div>
        `).join('');

        this.suggestionsList.innerHTML = suggestionsHTML;
        this.showSuggestions();
    }

    selectCity(name, region, country) {
        this.cityInput.value = name;
        this.hideSuggestions();
        this.getWeatherData(name);
    }

    showSuggestions() {
        this.suggestionsContainer.style.display = 'block';
    }

    hideSuggestions() {
        this.suggestionsContainer.style.display = 'none';
    }

    async getWeatherData(city) {
        this.showLoading();
        
        try {
            const url = `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${city}&aqi=yes`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                this.showError(data.error.message);
                return;
            }
            
            this.currentWeatherData = data;
            this.displayWeatherData(data);
            this.cityInput.value = '';
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('Failed to fetch weather data. Please try again.');
        }
    }

    displayWeatherData(data) {
        const { location, current } = data;
        
        // Update location info
        this.cityName.textContent = location.name;
        this.countryName.textContent = `${location.region}, ${location.country}`;
        this.localTime.textContent = `Local time: ${this.formatTime(location.localtime)}`;
        
        // Update main weather info
        this.updateTemperature(current.temp_c, current.temp_f);
        this.weatherIcon.src = `https:${current.condition.icon}`;
        this.weatherIcon.alt = current.condition.text;
        this.weatherCondition.textContent = current.condition.text;
        
        // Update weather details
        this.visibility.textContent = `${current.vis_km} km`;
        this.humidity.textContent = `${current.humidity}%`;
        this.windSpeed.textContent = `${current.wind_kph} km/h`;
        this.updateFeelsLike(current.feelslike_c, current.feelslike_f);
        this.pressure.textContent = `${current.pressure_mb} mb`;
        this.uvIndex.textContent = current.uv;
        
        // Update UV index color based on value
        this.updateUVIndexColor(current.uv);
        
        this.showWeatherInfo();
    }

    updateTemperature(tempC, tempF) {
        if (this.currentTempUnit === 'celsius') {
            this.temperature.textContent = Math.round(tempC);
        } else {
            this.temperature.textContent = Math.round(tempF);
        }
    }

    updateFeelsLike(feelsLikeC, feelsLikeF) {
        if (this.currentTempUnit === 'celsius') {
            this.feelsLike.textContent = `${Math.round(feelsLikeC)}°C`;
        } else {
            this.feelsLike.textContent = `${Math.round(feelsLikeF)}°F`;
        }
    }

    toggleTemperatureUnit(unit) {
        this.currentTempUnit = unit;
        
        // Update button states
        this.celsiusBtn.classList.toggle('active', unit === 'celsius');
        this.fahrenheitBtn.classList.toggle('active', unit === 'fahrenheit');
        
        // Update temperature display if we have data
        if (this.currentWeatherData) {
            const { current } = this.currentWeatherData;
            this.updateTemperature(current.temp_c, current.temp_f);
            this.updateFeelsLike(current.feelslike_c, current.feelslike_f);
            
            // Update temperature unit display
            const tempUnit = document.querySelector('.temp-unit');
            tempUnit.textContent = unit === 'celsius' ? '°C' : '°F';
        }
    }

    updateUVIndexColor(uvValue) {
        const uvElement = this.uvIndex;
        uvElement.style.fontWeight = '600';
        
        if (uvValue <= 2) {
            uvElement.style.color = '#27ae60'; // Green - Low
        } else if (uvValue <= 5) {
            uvElement.style.color = '#f39c12'; // Orange - Moderate
        } else if (uvValue <= 7) {
            uvElement.style.color = '#e67e22'; // Dark Orange - High
        } else if (uvValue <= 10) {
            uvElement.style.color = '#e74c3c'; // Red - Very High
        } else {
            uvElement.style.color = '#8e44ad'; // Purple - Extreme
        }
    }

    formatTime(localtime) {
        const date = new Date(localtime);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.weatherInfo.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }

    showWeatherInfo() {
        this.loading.style.display = 'none';
        this.weatherInfo.style.display = 'block';
        this.errorMessage.style.display = 'none';
    }

    showError(message) {
        this.loading.style.display = 'none';
        this.weatherInfo.style.display = 'none';
        this.errorMessage.style.display = 'block';
        document.getElementById('errorText').textContent = message;
    }
}

// Initialize the weather app when the DOM is loaded
let weatherApp;
document.addEventListener('DOMContentLoaded', () => {
    weatherApp = new WeatherApp();
});

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.search-btn, .temp-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .search-btn, .temp-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);