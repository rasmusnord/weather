export interface Place {
  city: string;
  country: string;
  coordinates: Coordinate;
  hourlyForecast: OWMHourlyForecast;
}

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface OWMHourlyForecast {
  cnt: number;
  list: OWMForecast[];
  city: OWMCity;
}

export interface OWMCity {
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface OWMForecast {
  dt: number;
  main: OWMMain;
  weather: OWMWeather[];
  clouds: OWMClouds;
  wind: OWMWind;
  visibility: number;
  pop: number;
  rain?: OWMRain;
  snow?: OWMSnow;
}

export interface OWMClouds {
  all: number;
}

export interface OWMMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface OWMRain {
  "3h": number;
}

export interface OWMSnow {
  "3h": number;
}

export interface OWMWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OWMWind {
  speed: number;
  deg: number;
  gust: number;
}
