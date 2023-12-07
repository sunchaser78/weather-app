// In /api/weather.js
module.exports = async (req, res) => {
    const cityName = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(weatherData);
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: "Error fetching weather data" });
    }
};
