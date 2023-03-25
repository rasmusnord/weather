import { usePlacesContext } from "../contexts/PlacesContext";
import { useSettingsContext } from "../contexts/SettingsContext";
import Place from "./Place";

export default function Places() {
  const { places, loading, error } = usePlacesContext();
  const { settings } = useSettingsContext();

  if (loading || !places) {
    return (
      <section>
        <p>Loading ...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>{error.message}</p>
      </section>
    );
  }

  const filteredPlaces = places
    .filter((place) => place.minTemperature >= settings.minTemperature)
    .filter((place) => place.maxTemperature <= settings.maxTemperature)
    .filter((place) => place.maxPrecipitation <= settings.maxPrecipitation);

  const filteredOutPlaces = places.filter(
    (place) => !filteredPlaces.includes(place)
  );

  return (
    <>
      {filteredPlaces.map((place) => (
        <Place key={place.name} place={place} />
      ))}
      {filteredOutPlaces.map((place) => (
        <Place key={place.name} place={place} filteredOut={true} />
      ))}
    </>
  );
}
