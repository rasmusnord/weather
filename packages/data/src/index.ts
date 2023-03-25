import url from "url";
import path from "path";
import dotenv from "dotenv";
import { writeJson, ensureDir } from "./fs.js";
import { getHourlyForecastFromCoordinate } from "./weather.js";
import cities from "./config/europe.json" assert { type: "json" };
import { Place } from "./types";

dotenv.config();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

(async () => {
  try {
    const dataPath = path.join(__dirname, "..", "dist");
    const hourlyForecastsPath = path.join(dataPath, "hourlyForecasts.json");
    const hourlyForecasts = await Promise.all(
      cities.map(async ({ coordinates, city, country }): Promise<Place> => {
        const hourlyForecast = await getHourlyForecastFromCoordinate(
          coordinates
        );

        return { city, country, coordinates, hourlyForecast };
      })
    );

    await ensureDir(dataPath);
    await writeJson(hourlyForecastsPath, hourlyForecasts);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
