// In /api/image.js
module.exports = async (req, res) => {
    const cityName = req.query.city;
    const accessKey = process.env.UNSPLASH_API_KEY;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${accessKey}`;

    try {
        const imageResponse = await fetch(url);
        const imageData = await imageResponse.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(imageData.results[0].urls.regular);
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: "Error fetching image" });
    }
};
