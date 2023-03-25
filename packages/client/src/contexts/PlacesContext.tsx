import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPlaces } from "../utils/data";
import PlaceModel from "../models/PlaceModel";

export interface PlacesContextProps {
  places?: PlaceModel[];
  loading?: boolean;
  error?: Error;
}

export const PlacesContext = createContext<PlacesContextProps>({});

export const usePlacesContext = () => useContext(PlacesContext);

export function PlacesProvider(props: PropsWithChildren) {
  const { children } = props;
  const [places, setPlaces] = useState<PlaceModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getPlaces()
      .then((places) => setPlaces(places))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const value: PlacesContextProps = { places, loading, error };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}
