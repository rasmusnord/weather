import styles from "./StepperInput.module.css";

export interface StepperInputProps {
  value: number;
  step: number;
  min?: number;
  max?: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}

export default function StepperInput(props: StepperInputProps) {
  const { value, step, min, max, format, onChange } = props;

  const minus = () => {
    const next = value - step;

    onChange(min === undefined ? next : Math.max(min, next));
  };

  const plus = () => {
    const next = value + step;

    onChange(max === undefined ? next : Math.min(max, next));
  };

  return (
    <div className={styles.stepper}>
      <div>{format(value)}</div>
      <input type="button" value="-" onClick={minus} />
      <input type="button" value="+" onClick={plus} />
    </div>
  );
}
