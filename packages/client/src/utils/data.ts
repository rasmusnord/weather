import PlaceModel, { Place } from "../models/PlaceModel";
import data from "../../../data/dist/hourlyForecasts.json";

export const getPlaces = async () => {
  const places = PlaceModel.parseAll(data as Place[]);

  places.sort((a, b) => {
    if (a.precipitation !== b.precipitation) {
      return a.precipitation - b.precipitation;
    }

    if (a.clear !== b.clear) {
      return b.clear - a.clear;
    }

    return a.clouds - b.clouds;
  });

  return places;
};
