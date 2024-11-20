const fs = require('fs');

// Utility function to read the data from the database (data.json)
async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getWeatherDataByName(cityName) {
  try {
    // Get weather data from the database (data.json)
    const data = await getDataFromDatabase();
    
    // Find the city data based on the city name
    const cityData = data.find(city => city.city.toLowerCase() === cityName.toLowerCase());
    
    if (!cityData) {
      throw new Error('City not found');
    }

    // Format the weather data to return
    const weatherData = {
      city: cityData.city,
      temperature: cityData.weather.temperature,
      humidity: cityData.weather.humidity,
      windSpeed: cityData.weather.windSpeed,
      conditions: cityData.weather.conditions
    };

    return weatherData;
  } catch (error) {
    throw new Error('City not found');
  }
}

module.exports = {
  getWeatherDataByName
};
