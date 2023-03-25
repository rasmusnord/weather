import { createContext, useContext, useState, PropsWithChildren } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/storage";
import {
  absoluteZero,
  TemperatureUnit,
  temperatureUnits,
} from "../utils/temperature";
import { IDENTIFIER } from "../config";

export interface Settings {
  temperatureUnit: TemperatureUnit;
  minTemperature: number;
  maxTemperature: number;
  maxPrecipitation: number;
}

const DEFAULT_SETTINGS: Settings = {
  temperatureUnit: temperatureUnits[0],
  minTemperature: absoluteZero,
  maxTemperature: absoluteZero + 30,
  maxPrecipitation: 4,
};

interface SettingsContextValue {
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextValue>(
  {} as SettingsContextValue
);

export const useSettingsContext = () => useContext(SettingsContext);

export function SettingsProvider(props: PropsWithChildren) {
  const { children } = props;
  const [settings, setSettings] = useState<Settings>(() => {
    const settings = getLocalStorageItem<Settings>(IDENTIFIER);

    return { ...DEFAULT_SETTINGS, ...settings };
  });

  const setPartialSettings = (updatedSettings: Partial<Settings>) => {
    const s = { ...settings, ...updatedSettings };

    setSettings(s);
    setLocalStorageItem<Settings>(IDENTIFIER, s);
  };

  const value: SettingsContextValue = {
    settings,
    setSettings: setPartialSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
