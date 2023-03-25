import { useEffect, useRef } from "react";
import * as d3 from "d3";
import PlaceModel from "../../models/PlaceModel";
import ForecastModel from "../../models/ForecastModel";
import Chart from "./Chart";
import styles from "./Chart.module.css";
import { dateToShort } from "../../utils/date";
import { useTooltipContext } from "../../contexts/TooltipContext";

export interface PrecipitationChartProps {
  place: PlaceModel;
}

export default function PrecipitationChart(props: PrecipitationChartProps) {
  const { place } = props;
  const tooltip = useTooltipContext();
  const svgRef = useRef<SVGSVGElement>(null);
  const margin = { top: 40, right: 20, bottom: 50, left: 40 };
  const n = place.weather.length;

  const update = () => {
    const width = svgRef.current?.clientWidth;
    const height = svgRef.current?.clientHeight;

    if (!(width && height)) {
      console.error("No SVG Element");
      return;
    }

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const xValue = (d: ForecastModel) => d.date;
    const yValue = (d: ForecastModel) => d.precipitation;

    const minDate = d3.min(place.weather, (d) =>
      d3.timeHour.offset(xValue(d), 0)
    );
    const maxDate = d3.max(place.weather, (d) =>
      d3.timeHour.offset(xValue(d), 3)
    );

    const minPrecipitation = d3.min(place.weather, yValue);
    const maxPrecipitation = d3.max(place.weather, yValue);

    const timestampsPerDay = 24 / 3;
    const xTicks = n / timestampsPerDay;
    const yTicks = 5;

    if (
      minDate === undefined ||
      maxDate === undefined ||
      minPrecipitation === undefined ||
      maxPrecipitation === undefined
    ) {
      console.error("Invalid data");
      return;
    }

    const unit = "mm";
    const title = `Precipitation (${unit})`;

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width - margin.right]);

    const availableWidth = width - margin.left - margin.right;
    const barWidth = availableWidth / n - 2;

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(1, maxPrecipitation)])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).ticks(xTicks);
    const yAxis = d3.axisLeft(yScale).ticks(yTicks);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .selectAll("text")
      .classed(styles.xAxisText, true);

    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${margin.left}, 0)`);

    svg
      .selectAll(".bars")
      .data(place.weather)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(xValue(d)))
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", barWidth)
      .attr("height", (d) => height - margin.bottom - yScale(yValue(d)))
      .classed(styles.bars, true)
      .on("mouseover", (_, forecast) => {
        const fromDate = forecast.date;
        const toDate = d3.timeHour.offset(fromDate, 3);
        const fromDateFormatted = dateToShort(fromDate);
        const toDateFormatted = dateToShort(toDate);
        const amountText = `${forecast.precipitation} ${unit}`;
        const dateText = `${fromDateFormatted} - ${toDateFormatted}`;
        const text = `${amountText} (${dateText})`;

        tooltip.setText(text);
        tooltip.setVisible(true);
      })
      .on("mousemove", (event) => {
        tooltip.setX(event.pageY - 10);
        tooltip.setY(event.pageX + 10);
      })
      .on("mouseout", () => {
        tooltip.setText("");
        tooltip.setVisible(false);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .classed(styles.title, true)
      .text(title);
  };

  useEffect(update, []);

  useEffect(() => {
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return <Chart svgRef={svgRef} />;
}
