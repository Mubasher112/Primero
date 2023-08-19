import { Grid } from "@material-ui/core";

import { StackedBarChart } from "../../../../charts";

const Component = () => {
  const chartData = {
    labels: [
      "Case goals all met",
      "Case goals substantially met",
      "Child reached adulthood",
      "Child refuses services",
      "Safety of Child",
      "Death of child",
      "Other"
    ],
    datasets: [
      {
        label: "Male",
        data: [10, 10, 9, 7, 9, 13, 7],
        backgroundColor: "rgba(0, 128, 0, 1)", // Green
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1
      },
      {
        label: "Female",
        data: [12, 8, 2, 6, 3, 3, 6],
        backgroundColor: "rgba(255, 182, 193, 1)", // Pink
        borderColor: "rgba(255, 182, 193, 1)",
        borderWidth: 1
      },
      {
        label: "Transgender",
        data: [1, 2, 3, 2, 4, 2, 2],
        backgroundColor: "rgba(255, 255, 0, 1)", // Yellow
        borderColor: "rgba(255, 255, 0, 1)",
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
            labelString: "Protection Concern"
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            stepSize: 5 // Setting the gap to 5
          },
          scaleLabel: {
            display: true,
            labelString: "No of Cases"
          }
        }
      ]
    }
  };

  return (
    <Grid item xl={6} md={6} xs={12}>
      <h4>Closed Cases by Sex and Protection Concern</h4>
      <div style={{ border: "1px solid black" }}>
        <StackedBarChart chartData={chartData} options={options} />
      </div>
    </Grid>
  );
};

Component.displayName = `StackedBarChart`;

export default Component;
