// Vercel serverless function to fetch weather data
module.exports = async (req, res) => {
    const cityName = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY; // Your API key environment variable
    const url = `https://api.openweathermap.org/data/2.5/getWeather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();
        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
};