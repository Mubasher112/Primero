import { useRef, useEffect } from "react";
import Chart from "chart.js";
import PropTypes from "prop-types";

const StackedBarChart = ({ chartData, options = {} }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            xAxes: [{ stacked: true, ...options.xAxes }],
            yAxes: [{ stacked: true, ticks: { beginAtZero: true }, ...options.yAxes }]
          },
          ...options
        }
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData, options]);

  return <canvas ref={chartRef} />;
};

StackedBarChart.displayName = "StackedBarChart";

StackedBarChart.propTypes = {
  chartData: PropTypes.object.isRequired,
  options: PropTypes.object
};

export default StackedBarChart;
