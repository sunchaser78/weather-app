module.exports = async (req, res) => {
    const API_KEY = process.env.YOUR_API_KEY; // Set in Vercel environment variables
    // Logic to call the external API using the API_KEY
    res.status(200).json({ data: "Response from API" });
};