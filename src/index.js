import "./style.css";

const searchResult = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const errorText = document.getElementById("errorText");

async function getWeatherInfo() {
  const searchCity = searchInput.value.trim();

  if (!searchCity) {
    errorText.textContent = "Please enter a city name";
    searchResult.style.display = "none";
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=bf7cda194f2e46f3a1750638231810&q=${searchCity}`,
      { mode: "cors" }
    );

    const weatherData = await response.json();
    console.log(weatherData);

    if (weatherData.error) {
      errorText.textContent = weatherData.error.message;
      searchResult.style.display = "none";
      return;
    }

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

    errorText.textContent = "";
    searchResult.style.display = "flex";
  } catch (error) {
    if (error instanceof TypeError) {
      errorText.textContent =
        "Network error. Please check your connection and try again.";
      searchResult.style.display = "none";
    } else if (error.message.includes("404")) {
      errorText.textContent =
        "City not found. Please check the spelling and try again.";
      searchResult.style.display = "none";
    } else if (error.message.includes("500")) {
      errorText.textContent = "Server error. Please try again later.";
      searchResult.style.display = "none";
    } else {
      errorText.textContent = "Unexpected error occurred. Please try again.";
      searchResult.style.display = "none";
    }
  }
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getWeatherInfo();
});
