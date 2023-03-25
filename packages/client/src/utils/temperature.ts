export const absoluteZero = 273.15;

export const temperatureUnits = ["C", "F", "K"] as const;

export type TemperatureUnit = (typeof temperatureUnits)[number];

export const kelvinToCelsius = (k: number) => k - absoluteZero;

export const kelvinToFahrenheit = (k: number) =>
  kelvinToCelsius(k) * (9 / 5) + 32;

export const convertTemperature = (k: number, unit: TemperatureUnit) => {
  switch (unit) {
    case "C":
      return kelvinToCelsius(k);
    case "F":
      return kelvinToFahrenheit(k);
    default:
      return k;
  }
};
