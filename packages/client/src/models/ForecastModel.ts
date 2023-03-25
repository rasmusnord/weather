import { epochToDate } from "../utils/date";
import { OWMForecast } from "../../../data/src/types";

export { type OWMForecast } from "../../../data/src/types";

export default class ForecastModel {
  public date: Date;
  public temperature: number;
  public rain: number;
  public snow: number;
  public clear: boolean;
  public clouds: boolean;

  constructor(
    date: Date,
    temperature: number,
    rain: number,
    snow: number,
    clear: boolean,
    clouds: boolean
  ) {
    this.date = date;
    this.temperature = temperature;
    this.rain = rain;
    this.snow = snow;
    this.clear = clear;
    this.clouds = clouds;
  }

  static parse(raw: OWMForecast) {
    const date = epochToDate(raw.dt);
    const temperature = raw.main.temp;
    const rain = raw.rain ? raw.rain["3h"] : 0;
    const snow = raw.snow ? raw.snow["3h"] : 0;
    const clear = raw.weather[0].main === "Clear";
    const clouds = raw.weather[0].main === "Clouds";

    return new ForecastModel(date, temperature, rain, snow, clear, clouds);
  }

  get precipitation() {
    return this.rain + this.snow;
  }

  static parseAll(arr: OWMForecast[]) {
    return arr.map((raw) => ForecastModel.parse(raw));
  }
}
