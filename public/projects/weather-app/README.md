# Weather App

A desktop weather application built with PyQt5 that provides real-time weather information with beautiful emoji representations and temperature displays.

## Features

- Real-time weather data retrieval via OpenWeatherMap API
- Beautiful emoji weather representations based on weather conditions
- Temperature display in Fahrenheit with precise calculations
- Comprehensive error handling for API and network issues
- Clean, modern PyQt5 interface with custom styling
- Support for any city worldwide

## Installation

1. Install the required dependencies:
```bash
pip install PyQt5 requests
```

2. Run the application:
```bash
python weather_app.py
```

## Usage

1. Enter a city name in the input field
2. Click "Get Weather" to retrieve current weather information
3. View the temperature, weather emoji, and description

## Requirements

- Python 3.6+
- PyQt5
- requests library
- Internet connection for API calls

## API Key

The application uses the OpenWeatherMap API. The API key is included in the code for demonstration purposes, but for production use, you should:

1. Get your own API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the API key in the `get_weather` method
3. Store the API key securely (e.g., in environment variables)

## Error Handling

The application includes comprehensive error handling for:
- Invalid city names
- Network connectivity issues
- API rate limiting
- Server errors
- Timeout errors

## Weather Emoji Mapping

The app maps weather conditions to appropriate emojis:
- ⛈️ Thunderstorm
- 🌦️ Drizzle/Rain showers
- 🌧️ Rain
- 🌨️ Freezing rain
- ❄️ Snow
- 🌫️ Fog/Mist
- ☀️ Clear sky
- 🌤️ Few clouds
- ⛅ Scattered clouds
- 🌥️ Broken clouds
- ☁️ Overcast clouds 