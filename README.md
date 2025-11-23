# 🌤️ Weather Web Application

A beautiful, responsive weather application built with HTML, CSS, and JavaScript using the WeatherAPI.com service.

## ✨ Features

- **Beautiful UI**: Modern, glassmorphism design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Weather Data**: Current weather conditions from WeatherAPI.com
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Comprehensive Weather Info**: 
  - Current temperature and "feels like" temperature
  - Weather conditions with icons
  - Humidity, wind speed, and visibility
  - Atmospheric pressure and UV index
  - Local time display
- **Smart Search**: Search for any city worldwide
- **Error Handling**: User-friendly error messages
- **Dark Mode Support**: Automatic dark mode based on system preferences

## 🚀 Quick Start

### Method 1: Using Python Server (Recommended)
```bash
cd Weather
python3 server.py
```
The app will automatically open in your browser at `http://localhost:5500`

### Method 2: Direct File Opening
Simply open `index.html` in your web browser. Note: Some browsers may block API requests when opening files directly due to CORS policies.

## 🔧 Configuration

The API key is already configured in the JavaScript file. If you need to change it:

1. Open `script.js`
2. Find the line: `this.API_KEY = '26c2a6127edf49c2a9e153735250211';`
3. Replace with your WeatherAPI.com API key

## 📱 Usage

1. **Default Location**: The app loads with weather data for Vellore by default
2. **Search**: Enter any city name in the search box and press Enter or click the search button
3. **Temperature Units**: Click the °C or °F buttons to switch between temperature units
4. **Weather Details**: View comprehensive weather information in the detail cards

## 🎨 Design Features

- **Glassmorphism Effect**: Modern frosted glass appearance
- **Gradient Backgrounds**: Beautiful color gradients
- **Smooth Animations**: Fade-in effects and hover animations
- **Interactive Elements**: Button ripple effects and hover states
- **Typography**: Clean, readable Poppins font
- **Icons**: Font Awesome icons for visual appeal

## 📊 Weather Data Includes

- Current temperature and feels-like temperature
- Weather condition with descriptive icon
- Humidity percentage
- Wind speed (km/h)
- Visibility (km)
- Atmospheric pressure (mb)
- UV index with color coding
- Local time

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔒 Privacy & Security

- No user data is stored locally
- All weather data is fetched directly from WeatherAPI.com
- HTTPS API calls ensure secure data transmission

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: WeatherAPI.com
- **Server**: Python HTTP server (for local development)
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Font Awesome

## 📝 API Information

This app uses the WeatherAPI.com free tier which provides:
- Current weather data
- 1000 API calls per month
- Real-time weather information
- Global coverage

