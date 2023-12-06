// Vercel serverless function to fetch city images from Unsplash
module.exports = async (req, res) => {
    const cityName = req.query.city;
    const accessKey = process.env.UNSPLASH_API_KEY;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${accessKey}`;

    try {
        const imageResponse = await fetch(url);
        const imageData = await imageResponse.json();
        res.status(200).json(imageData.results[0].urls.regular); // or modify based on how you want to handle the data
    } catch (error) {
        res.status(500).json({ error: "Error fetching image" });
    }
};
