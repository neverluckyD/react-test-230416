import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getGeoLocation from "../services/geolocation";
import getWeather from "../services/weather";

const initialState = {
  city: "",
  country: "",
  result: null,
  locationError: null,
  history: [],
};

export const getWeatherAsync = createAsyncThunk(
  "weather/getWeather",
  async ({ city, country }, { rejectWithValue }) => {
    const geoLocation = await getGeoLocation(city, country.value);
    if (!geoLocation || !geoLocation.length) {
      return rejectWithValue("Not found");
    }

    // Get geolocation of first result
    const { lat, lon, name } = geoLocation[0];
    const response = await getWeather(lat, lon);
    // The value we return becomes the `fulfilled` action payload
    const { dew_point, feels_like, weather, humidity, dt } = response.current;
    return {
      dew_point: dew_point - 273.15,
      feels_like: feels_like - 273.15,
      weather: weather[0],
      humidity,
      dt,
      city: name,
      country,
      lat,
      lon,
    };
  }
);

export const getWeatherAgainAsync = createAsyncThunk(
  "weather/getWeatherAgain",
  async ({ lat, lon, city, country }) => {
    const response = await getWeather(lat, lon);
    // The value we return becomes the `fulfilled` action payload
    const { dew_point, feels_like, weather, humidity, dt } = response.current;
    return {
      dew_point: dew_point - 273.15,
      feels_like: feels_like - 273.15,
      weather: weather[0],
      humidity,
      dt,
      city,
      country,
      lat,
      lon,
    };
  }
);

const handleResult = (state, payload) => {
  state.result = payload;
  // Handle history
  const { city, country, dt, lat, lon } = payload;
  let tempHistory = JSON.parse(JSON.stringify(state.history));
  const existLocationIndex = tempHistory.findIndex((history) => {
    return history.city === city && history.country.value === country.value;
  });
  if (existLocationIndex >= 0) {
    // History exist, remove it
    tempHistory.splice(existLocationIndex, 1);
  }
  // Add history to first position
  tempHistory.unshift({ city, country, dt, lat, lon });
  state.history = [...tempHistory];
  state.locationError = null;
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    clearInput: (state) => {
      state.city = "";
      state.country = "";
    },
    removeHistory: (state, action) => {
      const { city, country } = action.payload;
      let tempHistory = JSON.parse(JSON.stringify(state.history));
      const existLocationIndex = tempHistory.findIndex((history) => {
        return history.city === city && history.country.value === country.value;
      });
      if (existLocationIndex >= 0) {
        // History exist, remove it
        tempHistory.splice(existLocationIndex, 1);
      }
			state.history = [...tempHistory];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherAsync.fulfilled, (state, action) => {
        handleResult(state, action.payload);
      })
      .addCase(getWeatherAsync.rejected, (state, action) => {
        state.locationError = action.payload;
      })
      .addCase(getWeatherAgainAsync.fulfilled, (state, action) => {
        handleResult(state, action.payload);
      });
  },
});

export const { clearInput, setCity, setCountry, removeHistory } = weatherSlice.actions;

export const selectCity = (state: AppState) => state.weather.city;
export const selectCountry = (state: AppState) => state.weather.country;
export const selectResult = (state: AppState) => state.weather.result;
export const selectError = (state: AppState) => state.weather.locationError;
export const selectHistory = (state: AppState) => state.weather.history;

export default weatherSlice.reducer;
