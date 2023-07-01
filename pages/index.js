import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/weathercard";
import "tailwindcss/tailwind.css";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons
import dotenv from "dotenv";
dotenv.config();

// background images imported
import snow from "../public/beautiful-snowy-landscape-with-mountains.jpg";
import thunderstorm from "../public/beautiful-shot-lightning-strike-zagreb-croatia.jpg";
import cloud from "../public/beautiful-view-empty-road-surrounded-by-greenery-dark-storm-clouds.jpg";
import haze from "../public/pexels-james-wheeler-1605325.jpg";
import sunny from "../public/bayu-syaits-jdYbJrq3Iuk-unsplash.jpg";
import mist from "../public/mist.jpg";
import drizzle from "../public/drizzle.jpg";
import rain from "../public/rain.jpg";
import clear from "../public/pexels-tembela-bohle-920040.jpg";
import fog from "../public/fogg.jpg";
import spinner from "../public/spinner-blue.svg";

const apiKey = "8261a1ff336765372a9466758d99d994";

export default function Home() {
  const [location, setLocation] = useState("delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(false); // Temperature unit state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // to manage the temperature units
  const toggleTemperatureUnit = () => {
    setIsFahrenheit((prev) => !prev);
  };

  // to default data show in page
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    let url = "";
    if (isNaN(location)) {
      // If the location is not a number (not a city ID)
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    } else if (location.length === 5) {
      // If the location is a 5-digit zip code
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${apiKey}`;
    } else {
      // If the location is a number (city ID)
      url = `https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${apiKey}`;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      if (response.data) {
        const data = response.data;

        // Current Time
        const currentTime = new Date();
        const currentTimeWithOffset = new Date(
          currentTime.getTime() + data.timezone * 1000
        ); // Adjusting the time with the timezone offset

        // Format the current time
        const currentTimeOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "UTC",
          timeZoneName: "short"
        };
        const formattedCurrentTime = currentTimeWithOffset.toLocaleString(
          "en-US",
          currentTimeOptions
        );

        //sunrise and sunset time formated according to timezone

        const sunriseTimestamp = data.sys.sunrise * 1000;
        const sunsetTimestamp = data.sys.sunset * 1000;

        const formattedSunriseTime = new Date(
          sunriseTimestamp + data.timezone * 1000
        ).toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        });
        const formattedSunsetTime = new Date(
          sunsetTimestamp + data.timezone * 1000
        ).toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        });

        const weatherData = {
          temperatureC: Math.round(data.main.temp - 273.15),
          temperatureF: Math.round((data.main.temp - 273.15) * (9 / 5) + 32),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: (data.wind.speed * 3.6).toFixed(2),
          icon:
            "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
          name: data.name,
          current_time: formattedCurrentTime,
          min_tempC: Math.round(data.main.temp_min - 273.15),
          max_tempC: Math.round(data.main.temp_max - 273.15),
          min_tempF: Math.round((data.main.temp_min - 273.15) * (9 / 5) + 32),
          max_tempF: Math.round((data.main.temp_max - 273.15) * (9 / 5) + 32),
          pressure: data.main.pressure,
          sunrise: formattedSunriseTime,
          sunset: formattedSunsetTime,
          country: data.sys.country
        };
        setWeather(weatherData);
        setError(null);
        toast.success("Location fetched");
      } else {
        setWeather(null);
        setError("Location not found");
        toast.error("Location not found");
      }
    } catch (error) {
      console.error(error);
      setWeather(null);
      setError("Error fetching weather data");
      toast.error("Error fetching weather data");
    }
    setIsLoading(false);
    setLocation("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // manage background image according to weather
  useEffect(() => {
    if (weather) {
      const weatherDescription = weather.description.toLowerCase();
      let backgroundUrl = clear; // Default background image

      if (weatherDescription.includes("rain")) {
        backgroundUrl = rain;
      } else if (weatherDescription.includes("snow")) {
        backgroundUrl = snow;
      } else if (weatherDescription.includes("cloud")) {
        backgroundUrl = cloud;
      } else if (weatherDescription.includes("thunderstorm")) {
        backgroundUrl = thunderstorm;
      } else if (weatherDescription.includes("haze")) {
        backgroundUrl = haze;
      } else if (weatherDescription.includes("sunny")) {
        backgroundUrl = sunny;
      } else if (weatherDescription.includes("fog")) {
        backgroundUrl = fog;
      } else if (weatherDescription.includes("drizzle")) {
        backgroundUrl = drizzle;
      } else if (weatherDescription.includes("mist")) {
        backgroundUrl = mist;
      }
      setBackgroundImage(backgroundUrl.src);
    }
  }, [weather]);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../public/favicon.png" />
      </Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100 bg-cover bg-center  bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-opacity-40 bg-black w-full md:fixed mt-0 top-0 pt-1">
          <div className="flex flex-col md:flex-row  items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold text-blue-400 mt-1 mb-1 md:mb-0 md:mt-0 md:text-3xl transition ease-out duration-400 hover:scale-105 ">
              Weather App
            </h1>
            <div className="flex flex-row mt-1 md:mt-0 justify-center md:justify-end w-auto">
              {/* Search box */}
              <div className="relative w-80 md:w-60">
                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  onKeyPress={handleKeyPress}
                  className="w-full py-2 px-4 bg-transparent bg-opacity-50 border border-white rounded-lg text-white transition duration-300 placeholder-white focus:outline-none hover:scale-105 "
                  placeholder="Enter location"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:scale-125 transition duration-300"
                  onClick={handleSearch}
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center mt-1 md:mt-0">
              <div className="flex flex-row w-1/4 items-center justify-center">
                <button
                  name="metric"
                  className="text-xl md:text-2xl text-white text-orange-500 font-light transition ease-out duration-200 hover:scale-125 hover:text-blue-400 text-3xl font-bold  mt-4 mb-4 md:mb-0 md:mt-0"
                  onClick={toggleTemperatureUnit}
                >
                  °C
                </button>
                <p className="text-xl md:text-2xl text-white text-red-500 mx-1">
                  |
                </p>
                <button
                  name="imperial"
                  className="text-xl md:text-2xl text-white text-orange-500 font-light transition ease-out duration-200 hover:scale-125 hover:text-blue-400 text-3xl font-bold  mt-4 mb-4 md:mb-0 md:mt-0"
                  onClick={toggleTemperatureUnit}
                >
                  °F
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          {isLoading ? ( // Display the spinner if loading is true
            <img
              src={spinner}
              alt="Loading..."
              className="text-white text-white-600"
            />
          ) : error ? ( // Display the error message if there's an error
            <p className="text-red-600 mt-2 bg-opacity-50 bg-black px-4 py-2">
              {error}
            </p>
          ) : weather ? ( // Display the weather card if weather data is available
            <WeatherCard
              location={location}
              weather={weather}
              isFahrenheit={isFahrenheit}
            />
          ) : null}
        </div>
      </div>
      <footer className="bg-black  py-4 text-center bottom-0">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Weather App. All rights reserved.
        </p>
      </footer>
    </>
  );
}
