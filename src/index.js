import "./style.css";

const searchResult = document.getElementById("searchResult");

const searchBtn = document.getElementById("searchBtn");

async function getWeatherInfo() {
  const searchCity = document.getElementById("searchInput").value;
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=bf7cda194f2e46f3a1750638231810&q=${searchCity}`
    );

    const weatherData = await response.json();
    console.log(weatherData);

    const cityName = weatherData.location.name;
    const temperature = weatherData.current.temp_c;
    const feelsLike = weatherData.current.feelslike_c;
    const humidity = weatherData.current.humidity;
    const wind = weatherData.current.wind_kph;

    document.getElementById("cityName").textContent = cityName;
    document.getElementById("temperature").textContent =
      temperature + " " + "°C";
    document.getElementById("feelsLike").textContent =
      "Feels like:" + " " + feelsLike + " " + "°C";
    document.getElementById("humidity").textContent =
      "Humidity:" + " " + humidity + " " + "%";
    document.getElementById("wind").textContent =
      "Wind:" + " " + wind + " " + "km/h";
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getWeatherInfo();
  searchResult.style.display = "block";
});
