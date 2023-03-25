import styles from "./ToggleGroupInput.module.css";

export interface ToggleGroupInputProps<T> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
}

export default function ToggleGroupInput<T>(props: ToggleGroupInputProps<T>) {
  const { value, options, onChange } = props;

  return (
    <div className={styles.toggleGroup}>
      {options.map((option, i) => (
        <input
          key={i}
          type="button"
          className={option === value ? styles.selected : ""}
          value={`${option}`}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  );
}
