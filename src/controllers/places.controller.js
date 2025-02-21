const axios = require("axios");

const getNearbyVets = async (req, res) => {
  try {
    const { lat, lng, radius = 5000, type = "veterinary_care" } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Latitude and Longitude are required in the request body",
      });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

    const response = await axios.get(googleUrl);

    const vetClinics = response.data.results.map((place) => ({
      name: place.name,
      address: place.vicinity,
      location: place.geometry.location,
      rating: place.rating || "Not Available",
      total_ratings: place.user_ratings_total || 0,
    }));

    res.json({ results: vetClinics, status: response.data.status });
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    res.status(500).json({
      message: "Failed to fetch veterinary clinics",
      error: error.message,
    });
  }
};

module.exports = { getNearbyVets };
