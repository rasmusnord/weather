import { useTooltipContext } from "../../contexts/TooltipContext";
import styles from "./Tooltip.module.css";

export default function Tooltip() {
  const { x, y, text, visible } = useTooltipContext();

  const visibleClass = visible ? styles.visible : "";
  const className = [styles.tooltip, visibleClass].join(" ");

  return (
    <div className={className} style={{ top: `${x}px`, left: `${y}px` }}>
      {text}
    </div>
  );
}
