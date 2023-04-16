import { API_KEY, WEATHER_API_ENDPOINT } from "../configs/configs";

const getWeather = async (lat, lon) => {
  const response = await fetch(
    `${WEATHER_API_ENDPOINT}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    {
      method: "GET",
    }
  );
  const result = await response.json();

  return result;
};

export default getWeather;