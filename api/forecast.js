// In /api/forecast.js
module.exports = async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const forecastResponse = await fetch(url);
        const forecastData = await forecastResponse.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(forecastData);
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: "Error fetching forecast data" });
    }
};
