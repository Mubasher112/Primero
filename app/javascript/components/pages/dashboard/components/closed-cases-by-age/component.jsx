import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: Array.from({ length: 17 }, (_, i) => (i + 1).toString()), // ["1", "2", ..., "17"]
    datasets: [
      {
        label: "Violence",
        data: Array.from({ length: 17 }, () => Math.floor(Math.random() * 30)),
        backgroundColor: "rgba(0, 0, 255, 1)", // Blue
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1
      },
      {
        label: "Exploitation",
        data: Array.from({ length: 17 }, () => Math.floor(Math.random() * 30)),
        backgroundColor: "rgba(255, 165, 0, 1)", // Orange
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Neglect or negligent",
        data: Array.from({ length: 17 }, () => Math.floor(Math.random() * 30)),
        backgroundColor: "rgba(128, 128, 128, 1)", // Gray
        borderColor: "rgba(128, 128, 128, 1)",
        borderWidth: 1
      },
      {
        label: "Abuse",
        data: Array.from({ length: 17 }, () => Math.floor(Math.random() * 30)),
        backgroundColor: "rgba(255, 255, 0, 1)", // Yellow
        borderColor: "rgba(255, 255, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Harmful Practices",
        data: Array.from({ length: 17 }, () => Math.floor(Math.random() * 30)),
        backgroundColor: "rgba(173, 216, 230, 1)", // Light blue
        borderColor: "rgba(173, 216, 230, 1)",
        borderWidth: 1
      },
      {
        label: "Other",
        data: Array.from({ length: 17 }, () => Math.floor(Math.random() * 30)),
        backgroundColor: "rgba(0, 128, 0, 1)", // Green
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: "Cases Status"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "No of cases"
          }
        }
      ]
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xl={12} md={12} xs={12}>
        <h4>Closed Cases by Age and Protection Concern</h4>
        <div style={{ border: "1px solid black" }}>
          <StackedBarChart chartData={chartData} options={options} />
        </div>
      </Grid>
    </Grid>
  );
};

Component.displayName = `StackedBarChart`;

export default Component;
