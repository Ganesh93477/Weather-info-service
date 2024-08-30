const axios = require('axios');
const readline = require('readline');

const API_KEY = '158769c0ae5e7508c147bbc62833e869'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getWeather = async (location) => {
  try {
    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: API_KEY,
        query: location
      }
    });
    
    const data = response.data;
    
    if (data.current) {
      const locationName = data.location.name;
      const temperature = data.current.temperature;
      const weatherDescription = data.current.weather_descriptions[0];
      console.log(`Weather in ${locationName}: ${weatherDescription} with a temperature of ${temperature}°C`);
    } else {
      console.log("Error fetching weather data.");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

rl.question('Enter city or location: ', (location) => {
  getWeather(location);
  rl.close();
});
