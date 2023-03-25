import { Coordinate } from "./types";

export const getHourlyForecastFromCoordinate = async (
  coordinate: Coordinate
) => {
  const { OWM_API_KEY } = process.env;

  if (!OWM_API_KEY) {
    throw new Error("OWM_API_KEY is not set.");
  }

  const { lat, lon } = coordinate;
  const url = new URL("https://api.openweathermap.org/data/2.5/forecast");

  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lon.toString());
  url.searchParams.set("appid", OWM_API_KEY);

  const res = await fetch(url);
  const data = await res.json();

  return data;
};
