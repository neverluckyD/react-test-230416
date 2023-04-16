import { API_KEY, WEATHER_API_ENDPOINT } from "../configs/configs";

const getGeoLocation = async (city, country) => {
  const response = await fetch(
    `${WEATHER_API_ENDPOINT}/geo/1.0/direct?q=${[city, country].join(",")}&appid=${API_KEY}`,
    {
      method: "GET"
    }
  );
  const result = await response.json();

  return result;
};

export default getGeoLocation;
