Weather Application
Description

This weather application provides real-time weather information and forecasts for cities around the world. It's designed to give users an easy and interactive way to check current weather conditions, along with a five-day forecast.
Features

    City Selection: Users can choose from a list of global cities to view the current weather and forecast.
    Real-Time Weather Data: Displays current weather conditions like temperature, humidity, and weather conditions (sunny, cloudy, etc.).
    Five-Day Forecast: Offers a five-day weather forecast with daily summaries.
    Dynamic Backgrounds: The application features dynamic backgrounds that change according to the selected city's current weather conditions.

How It Works
Weather Data Fetching

The application makes API calls to the OpenWeatherMap API to fetch weather data. This includes current weather conditions and a five-day forecast for the selected city.
Image Fetching

It also fetches city images from Unsplash API to display as background images corresponding to the selected city.
Serverless Functions

To enhance security and hide sensitive API keys, the application uses serverless functions deployed on Vercel. These functions act as intermediaries between the client-side application and the external APIs.
Weather.js

This serverless function handles requests to the OpenWeatherMap API. It takes a city name as input, constructs a request using the stored API key, and fetches weather data.
Image.js

Similar to weather.js, this function manages requests to the Unsplash API. It receives a city name, uses the Unsplash API key to fetch relevant city images, and returns the image URLs to the client.
CORS Policy

Serverless functions are configured with CORS headers to ensure that requests from the client-side are handled correctly and securely.
Environment Variables

The application uses environment variables to store API keys securely. These variables are set in the serverless functions environment and are not exposed to the client-side, ensuring better security for API access.
Setup and Installation

    Clone the repository: git clone [repository_url]
    Install dependencies: Run npm install in the project directory.
    Set up environment variables: Add your OpenWeatherMap and Unsplash API keys to the serverless function environment.
    Deploy on Vercel: Push your code to a repository and connect it to Vercel for deployment.

Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.
License

MIT