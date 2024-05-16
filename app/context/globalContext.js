"use client";

import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import defaultState from "../utils/defaultState";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [geoCodeList, setGeoCodeList] = useState(defaultState);
  const [activeCityCoords, setActiveCityCoords] = useState([
    56.1199999, 93.335,
  ]);

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Air quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //fetch uv indexe
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.log("Error fetching uv data: ", error.message);
    }
  };
  // fetch geocode list
  const fetchGeoCodeList = async (search) => {
    try {
      const res = await axios.get(`api/geocode?search=${search}`);
      setGeoCodeList(res.data);
    } catch (error) {
      console.log("Error fetching geocode data: ", error.message);
    }
  };
  // handle input
  const handleInput = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setGeoCodeList(defaultState);
    }
  };
  // debounce
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodeList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => {
      return debouncedFetch.cancel();
    };
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast: forecast,
        airQuality: airQuality,
        fiveDayForecast: fiveDayForecast,
        uvIndex: uvIndex,
        geoCodeList: geoCodeList,
        inputValue: inputValue,
        handleInput: handleInput,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords: setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export const useGlobalContextUpdate = () => {
  return useContext(GlobalContextUpdate);
};
