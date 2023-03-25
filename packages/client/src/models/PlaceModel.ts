import { sum } from "../utils/math";
import ForecastModel from "./ForecastModel";
import { Coordinate, Place } from "../../../data/src/types";

export { type Place } from "../../../data/src/types";

export default class PlaceModel {
  public name: string;
  public country: string;
  public coordinates: Coordinate;
  public weather: ForecastModel[];

  constructor(
    name: string,
    country: string,
    coordinates: Coordinate,
    weather: ForecastModel[]
  ) {
    this.name = name;
    this.country = country;
    this.coordinates = coordinates;
    this.weather = weather;
  }

  static parse(raw: Place) {
    const name = raw.city;
    const country = raw.country;
    const coordinates = raw.coordinates;
    const weather = ForecastModel.parseAll(raw.hourlyForecast.list);

    return new PlaceModel(name, country, coordinates, weather);
  }

  get rain() {
    return sum(this.weather.map((f) => f.rain));
  }

  get snow() {
    return sum(this.weather.map((f) => f.snow));
  }

  get precipitation() {
    return sum(this.weather.map((f) => f.precipitation));
  }

  get clear() {
    return sum(this.weather.map((f) => (f.clear ? 1 : 0)));
  }

  get clouds() {
    return sum(this.weather.map((f) => (f.clouds ? 1 : 0)));
  }

  get minTemperature() {
    return Math.min(...this.weather.map((f) => f.temperature));
  }

  get maxTemperature() {
    return Math.max(...this.weather.map((f) => f.temperature));
  }

  get maxPrecipitation() {
    return Math.max(...this.weather.map((f) => f.precipitation / 3));
  }

  static parseAll(arr: Place[]) {
    return arr.map((raw) => PlaceModel.parse(raw));
  }
}
