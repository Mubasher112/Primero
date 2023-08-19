import { useRef, useEffect } from "react";
import { Chart } from "chart.js";
import PropTypes from "prop-types";

const LineChartComponent = ({ chartData, options = {} }) => {
  const chartRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            xAxes: [{ ...options.xAxes }],
            yAxes: [{ ticks: { beginAtZero: true }, ...options.yAxes }]
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

LineChartComponent.displayName = "LineChartComponent";

LineChartComponent.propTypes = {
  chartData: PropTypes.object.isRequired,
  options: PropTypes.object
};

export default LineChartComponent;
