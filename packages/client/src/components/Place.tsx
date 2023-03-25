import PlaceModel from "../models/PlaceModel";
import { createMapsUrl } from "../utils/maps";
import PrecipitationChart from "./charts/PrecipitationChart";
import TemperatureChart from "./charts/TemperatureChart";
import styles from "./Place.module.css";

export interface PlaceProps {
  place: PlaceModel;
  filteredOut?: boolean;
}

export default function Place(props: PlaceProps) {
  const { place, filteredOut } = props;
  const { name, country, coordinates } = place;
  const mapsUrl = createMapsUrl(coordinates.lat, coordinates.lon);

  return (
    <section className={filteredOut ? styles.filteredOut : ""}>
      <h2>
        <a href={mapsUrl} target="_blank">
          {name}, {country}
        </a>
      </h2>
      <div className={styles.charts}>
        <TemperatureChart place={place} />
        <PrecipitationChart place={place} />
      </div>
    </section>
  );
}
