import { useSettingsContext } from "../contexts/SettingsContext";
import StepperInput from "./inputs/StepperInput";
import ToggleGroupInput from "./inputs/ToggleGroupInput";
import { convertTemperature, temperatureUnits } from "../utils/temperature";
import styles from "./Settings.module.css";

export default function Settings() {
  const { settings, setSettings } = useSettingsContext();

  const formatPrecipitation = (value: number) => value.toFixed(1);

  const formatTemperature = (value: number): string =>
    Math.round(convertTemperature(value, settings.temperatureUnit)).toFixed(0);

  return (
    <div className={styles.settings}>
      <div className={styles.setting}>
        <div className={styles.label}>Temperature Unit</div>
        <ToggleGroupInput
          value={settings.temperatureUnit}
          options={Array.from(temperatureUnits)}
          onChange={(temperatureUnit) => setSettings({ temperatureUnit })}
        />
      </div>
      <div className={styles.setting}>
        <div className={styles.label}>Max Precipitation</div>
        <StepperInput
          step={0.5}
          min={0}
          format={formatPrecipitation}
          value={settings.maxPrecipitation}
          onChange={(maxPrecipitation) => setSettings({ maxPrecipitation })}
        />
      </div>
      <div className={styles.setting}>
        <div className={styles.label}>Min Temperature</div>
        <StepperInput
          step={1}
          format={formatTemperature}
          value={settings.minTemperature}
          onChange={(minTemperature) => setSettings({ minTemperature })}
        />
      </div>
      <div className={styles.setting}>
        <div className={styles.label}>Max Temperature</div>
        <StepperInput
          step={1}
          format={formatTemperature}
          value={settings.maxTemperature}
          onChange={(maxTemperature) => setSettings({ maxTemperature })}
        />
      </div>
    </div>
  );
}
