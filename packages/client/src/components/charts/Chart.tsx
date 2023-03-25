import { RefObject } from "react";
import styles from "./Chart.module.css";

export interface ChartProps {
  svgRef: RefObject<SVGSVGElement>;
}

export default function Chart(props: ChartProps) {
  const { svgRef } = props;

  return (
    <div className={styles.container}>
      <svg ref={svgRef} className={styles.chart}></svg>
    </div>
  );
}
