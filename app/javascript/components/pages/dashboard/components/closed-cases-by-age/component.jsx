import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    datasets: [
      {
        label: "Physical",
        data: [0, 0, 1, 3, 1, 2, 6, 3, 1, 1, 0],
        backgroundColor: "rgba(0, 0, 255, 1)", // Blue
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1
      },
      {
        label: "Exploitation",
        data: [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 165, 0, 1)", // Orange
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Neglect or negligent",
        data: [0, 1, 0, 2, 2, 5, 4, 2, 2, 2, 0],
        backgroundColor: "rgba(128, 128, 128, 1)", // Gray
        borderColor: "rgba(128, 128, 128, 1)",
        borderWidth: 1
      },
      {
        label: "Abuse",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 255, 0, 1)", // Yellow
        borderColor: "rgba(255, 255, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Mental",
        data: [1, 0, 0, 0, 0, 3, 3, 2, 4, 3, 1],
        backgroundColor: "rgba(173, 216, 230, 1)", // Light blue
        borderColor: "rgba(173, 216, 230, 1)",
        borderWidth: 1
      },
      {
        label: "Other",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
