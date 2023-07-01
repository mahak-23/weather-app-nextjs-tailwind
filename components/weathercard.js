import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilCompass
} from "@iconscout/react-unicons";


const WeatherCard = ({ location, weather, isFahrenheit }) => {
  return (
    <>
      {/* time and location card*/}
      <div className="  flex flex-col md:flex-row justify-between ">
        <div className=" md:mr-20 bg-opacity-40 text-white rounded-lg shadow-md p-1 md:p-4 mb-6 md:mb-2  transition duration-500 hover:scale-105 bg-black hover:bg-opacity-50 hover:bg-slate-200 ">
          <div className="flex items-center justify-center my-3">
            <p className=" text-3xl font-medium">{`${weather.name}, ${weather.country}`}</p>
          </div>
          <div className="flex items-center justify-center my-3 md:my-6">
            <p className=" text-base md:text-xl font-light ">
              {weather.current_time.split(" at ")[0]}
            </p>
          </div>
          <div className="flex items-center justify-center my-3 md:my-6">
            <p className=" text-base md:text-xl font-light">
              {weather.current_time.split(" at ")[1]}
            </p>
          </div>
        </div>
        {/* temperature details card*/}
        <div className="md:ml-20 bg-opacity-40  text-white rounded-lg shadow-md p-2 md:p-4 mb-1 md:mb-2   transition duration-500 hover:scale-105 bg-black hover:bg-opacity-50 hover:bg-slate-200 ">
          <div className="flex flex-row items-center justify-center ">
            <div className=" py-6 text-3xl text-white-500 ">
              <p>
                {weather.description.charAt(0).toUpperCase() +
                  weather.description.slice(1)}
              </p>
            </div>
            <div className="w-20 ml-4">
              <img
                src={weather.icon}
                alt={weather.description}
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between py-3">
            <p className="text-5xl">
              {isFahrenheit ? weather.temperatureF : weather.temperatureC}
              {isFahrenheit ? "°F" : "°C"}
            </p>
            {/* </div> */}
            <div className="flex flex-col space-y-2 ml-4">
              <div className="flex font-light text-sm ">
                <UilTear size={18} className="mr-1 text-blue-400" />
                Humidity:
                <span className="font-medium ml-1">{weather.humidity}%</span>
              </div>
              <div className="flex font-light text-sm ">
                <UilWind size={18} className="mr-1 text-blue-400" />
                Wind:
                <span className="font-medium ml-1">
                  {weather.windSpeed} km/h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* extra details container */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-2 text-white text-sm py-3 mt-10 bottom-0">
        <div className="flex flex-row">
          <div className="flex items-center justify-center bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-2  max-w-lg mx-auto mr-2 transition duration-500 hover:scale-105 hover:bg-opacity-50  hover:bg-slate-50 hover:text-black ">
            <UilSun className="text-orange-400" />
            &nbsp;
            <p className="font-light">
              Rise:{" "}
              <span className="font-small ml-1 md:font-medium">
                {weather.sunrise}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center  bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-2  max-w-lg mx-auto transition duration-500 hover:scale-105 hover:bg-opacity-50  hover:bg-slate-50 hover:text-black ">
            <UilSunset className="text-orange-400" />
            &nbsp;
            <p className="font-light">
              Set:{" "}
              <span className="font-small ml-1 md:font-medium">
                {weather.sunset}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex items-center justify-center  bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-2   max-w-lg mx-auto mr-2 transition duration-500 hover:scale-105 hover:bg-opacity-50  hover:bg-slate-50 hover:text-black ">
            <UilTemperature className="text-red-500" />
            &nbsp;
            <p className="font-light">
              High:{" "}
              <span className="font-small ml-1 md:font-medium">
                {isFahrenheit ? weather.max_tempF : weather.max_tempC}
                {isFahrenheit ? "°F" : "°C"}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center  bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-2   max-w-lg mx-auto transition duration-500 hover:scale-105 hover:bg-opacity-50  hover:bg-slate-50 hover:text-black ">
            <UilTemperature className="text-red-500" />
            &nbsp;
            <p className="font-light">
              Low:{" "}
              <span className="font-small ml-1 md:font-medium">
                {isFahrenheit ? weather.min_tempF : weather.min_tempC}
                {isFahrenheit ? "°F" : "°C"}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex items-center justify-center  bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-2  max-w-lg mx-auto mr-2 transition duration-500 hover:scale-105 hover:bg-opacity-50  hover:bg-slate-50 hover:text-black ">
            <UilCompass className="text-blue-400" />
            &nbsp;
            <p className="font-light">
              Pressure:{" "}
              <span className="font-small ml-1 md:font-medium">
                {weather.pressure}hPa
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center  bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-2  max-w-lg mx-auto transition duration-500 hover:scale-105  hover:bg-slate-50 hover:bg-opacity-50 hover:text-black  ">
            <UilWind className="text-blue-400" />
            &nbsp; Wind:
            <span className="font-small ml-1 md:font-medium">
              {weather.windSpeed} km/h
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
