import { useEffect, useRef } from "react";
import * as d3 from "d3";
import PlaceModel from "../../models/PlaceModel";
import ForecastModel from "../../models/ForecastModel";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { average } from "../../utils/math";
import { convertTemperature } from "../../utils/temperature";
import Chart from "./Chart";
import styles from "./Chart.module.css";

export interface TemperatureChartProps {
  place: PlaceModel;
}

export default function TemperatureChart(props: TemperatureChartProps) {
  const { place } = props;
  const { settings } = useSettingsContext();
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

    const convert = (k: number) =>
      convertTemperature(k, settings.temperatureUnit);

    const xValue = (d: ForecastModel) => d.date;
    const yValue = (d: ForecastModel) => convert(d.temperature);

    const minDate = d3.min(place.weather, xValue);
    const maxDate = d3.max(place.weather, xValue);

    const minTemp = d3.min(place.weather, yValue);
    const maxTemp = d3.max(place.weather, yValue);

    const timestampsPerDay = 24 / 3;
    const xTicks = n / timestampsPerDay;
    const yTicks = 5;

    if (
      minDate === undefined ||
      maxDate === undefined ||
      minTemp === undefined ||
      maxTemp === undefined
    ) {
      console.error("Invalid data");
      return;
    }

    const title = `Temperature (${settings.temperatureUnit})`;

    const avg = average(place.weather.map(yValue));

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(convert(settings.minTemperature), minTemp),
        Math.max(convert(settings.maxTemperature), maxTemp),
      ])
      .range([height - margin.bottom, margin.top]);

    const generateScaledLine = d3
      .line<ForecastModel>()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)));

    const generateAvgScaledLine = d3
      .line<ForecastModel>()
      .x((d) => xScale(xValue(d)))
      .y(() => yScale(avg))
      .curve(d3.curveCardinal);

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
      .selectAll(".line")
      .data([place.weather])
      .join("path")
      .attr("d", (d) => generateAvgScaledLine(d))
      .classed(styles.average, true);

    svg
      .selectAll(".temperature")
      .data([place.weather])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .classed(styles.line, true);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .classed(styles.title, true)
      .text(title);
  };

  useEffect(update, [
    settings.temperatureUnit,
    settings.minTemperature,
    settings.maxTemperature,
  ]);

  useEffect(() => {
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return <Chart svgRef={svgRef} />;
}
